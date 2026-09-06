import { Modal, Tooltip, Upload, Progress, Flex } from 'antd';
import { useState, useContext } from 'react';
import Tesseract from 'tesseract.js';
import Draw from './draw.jsx';
import Ball from './Ball';
import { DrawContext } from '../App.jsx';
import {
  PlusOutlined,
  InboxOutlined,
  ClearOutlined,
  ScanOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { validateDrawLine } from '../utils/balls';

function Draws() {
  const [progress, setProgress] = useState(0);
  const [match, setMatch] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOcr, setShowOcr] = useState(true);
  const [ocrBusy, setOcrBusy] = useState(false);

  const {
    draws,
    addDraw,
    setDraws,
    clearDraws,
    drawInputRef,
    openMessage,
    onCheckMatches,
  } = useContext(DrawContext);

  const { Dragger } = Upload;
  const props = {
    name: 'file',
    multiple: false,
    action: '',
    showUploadList: false,
    beforeUpload: (file) => {
      onFileChange(file);
      return false;
    },
    onDrop(e) {
      const files = e.dataTransfer.files;
      if (files?.[0]) onFileChange(files[0]);
    },
  };

  const processResult = (result) => {
    const pattern = /(\d+\+\d+\+\d+\+\d+\+\d+\+\d+)/g;
    const matches = result.match(pattern);
    if (matches) {
      setMatch(matches);
    } else {
      console.log('No matches found.');
      openMessage?.(
        'processResult',
        'default',
        '掃描文字中未找到注項'
      );
      setMatch([]);
    }
    setIsModalOpen(true);
  };

  const onFileChange = (file) => {
    setOcrBusy(true);
    setProgress(0);
    Tesseract.recognize(file, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(m.progress);
        }
      },
    })
      .then(({ data: { text } }) => {
        processResult(text);
      })
      .catch((err) => {
        openMessage?.('ocr', 'error', `辨識失敗：${err.message}`);
      })
      .finally(() => setOcrBusy(false));
  };

  const handleInputChange = (idx, value) => {
    const updatedMatch = [...match];
    updatedMatch[idx] = value;
    setMatch(updatedMatch);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    drawInputRef.current.push(...Array.from({ length: match.length }, () => []));
    const convertedMatch = match.map((mat) => mat.split('+'));
    const invalid = convertedMatch.find((line) => !validateDrawLine(line).ok);
    if (invalid) {
      const v = validateDrawLine(invalid);
      openMessage?.('ocrConfirm', 'error', v.message);
    }
    setDraws([...draws, ...convertedMatch]);
  };

  const handleCancel = () => setIsModalOpen(false);

  const validCount = draws.filter((d) => validateDrawLine(d).ok).length;

  return (
    <div className="ms-page ms-page--draws">
      <div className="ms-page__head">
        <div>
          <div className="ms-eyebrow">
            <span className="ms-eyebrow__dot" />
            獎券庫
            <span className="ms-eyebrow__sep">/</span>
            <span className="ms-eyebrow__zh">六合彩自選及機票庫</span>
          </div>
          <div className="ms-page__title-row">
            <h1 className="ms-page__title">
              我的獎券
            </h1>
            <span className="ms-chip">
              <strong>{validCount}</strong> 注有效獎券 · {draws.length} 條記錄
            </span>
          </div>
        </div>
        <div className="ms-page__actions">
          <button
            type="button"
            className={`ms-btn ms-btn--ghost${showOcr ? ' is-active' : ''}`}
            onClick={() => setShowOcr((v) => !v)}
          >
            <ScanOutlined />
            拍照辨識
          </button>
          <button type="button" className="ms-btn ms-btn--primary" onClick={addDraw}>
            <PlusOutlined />
            手動新增注項
          </button>
          <Tooltip title="全部清除">
            <button
              type="button"
              className="ms-icon-btn"
              onClick={() => {
                clearDraws?.();
                setDraws([]);
              }}
              aria-label="全部清除"
            >
              <ClearOutlined />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="ms-layout">
        <div className="ms-layout__main">
          {showOcr && (
            <section className="ms-card ms-ocr">
              <div className="ms-ocr__grid">
                <div className="ms-ocr__drop">
                  <div className="ms-ocr__drop-head">
                    <ScanOutlined />
                    <span>彩票光學掃描</span>
                    <span className="ms-chip ms-chip--amber">檔案上傳</span>
                  </div>
                  <div className="ms-ocr__viewfinder ms-soon" aria-disabled title="相機取景即將推出 — 請先使用檔案上傳">
                    <span className="material-symbols-outlined">photo_camera</span>
                    <span>相機取景（即將推出）</span>
                    <span className="ms-soon-badge">即將推出</span>
                  </div>
                  <Dragger {...props} className="ms-ocr__dragger">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">點擊或拖放彩票圖片上傳</p>
                    <p className="ant-upload-hint">點擊或拖放彩票圖片以上傳辨識</p>
                  </Dragger>
                  {(ocrBusy || progress > 0) && (
                    <Progress
                      percent={Math.min(100, Math.round(progress * 100))}
                      showInfo
                      strokeColor="#dc2626"
                      size="small"
                      style={{ marginTop: 8 }}
                    />
                  )}
                </div>
                <div className="ms-ocr__hint">
                  <p className="ms-label-caps">智能辨識</p>
                  <h2>辨識結果校對及確認</h2>
                  <p className="ms-muted">
                    上傳後會彈出校對視窗。號碼須為 1–49 且不重複。
                  </p>
                  <ul className="ms-rules">
                    <li>6 個主號 · 範圍 1–49</li>
                    <li>不可重複</li>
                    <li>支援單式自選／機票格式辨識</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          <section className="ms-card">
            <div className="ms-card__head">
              <h2>待核對獎券清單</h2>
              <span className="ms-muted">{draws.length} 注</span>
            </div>
            <div className="ms-list">
              {draws.length === 0 && (
                <div className="ms-empty">尚未新增注項 — 可手動輸入或拍照辨識</div>
              )}
              {draws.map((_, idx) => (
                <Draw key={idx} id={idx} />
              ))}
            </div>
            <div className="ms-card__foot">
              <span className="ms-muted">
                總投注金額估計: <strong>HK$ {(draws.length * 10).toFixed(2)}</strong>
                <span className="ms-soon-inline"> · 禮券批次（即將推出）</span>
              </span>
              <button type="button" className="ms-btn ms-btn--primary" onClick={onCheckMatches}>
                立即核對本期中獎
              </button>
            </div>
          </section>
        </div>

        <aside className="ms-layout__side">
          <section className="ms-card ms-soon-panel">
            <div className="ms-card__head">
              <h2>智能機票生成器</h2>
              <span className="ms-soon-badge">即將推出</span>
            </div>
            <p className="ms-muted">智能生成器 — 介面預覽，尚未接駁</p>
            <div className="ms-chip-row" aria-disabled>
              {[1, 3, 5, 10].map((n) => (
                <span key={n} className="ms-chip ms-chip--inert">{n} 注</span>
              ))}
            </div>
            <label className="ms-check ms-soon"><input type="checkbox" disabled /> 避開冷號</label>
            <label className="ms-check ms-soon"><input type="checkbox" disabled /> 色波平衡</label>
            <label className="ms-check ms-soon"><input type="checkbox" disabled /> 單雙平衡</label>
            <button type="button" className="ms-btn ms-btn--amber ms-soon" disabled>
              生成並填入注項
            </button>
          </section>

          <section className="ms-card">
            <div className="ms-card__head">
              <h2>離線備份與同步</h2>
            </div>
            <p className="ms-muted">使用右下角雲端按鈕或頁尾匯出/匯入 JSON</p>
            <p className="ms-muted ms-soon">自動同步 IndexedDB（即將推出）</p>
          </section>

          <section className="ms-card">
            <div className="ms-card__head">
              <h2>六合彩注項規則指引</h2>
            </div>
            <ul className="ms-rules">
              <li><CheckCircleOutlined /> 6 個主號</li>
              <li><CheckCircleOutlined /> 範圍 1–49</li>
              <li><CheckCircleOutlined /> 不可重複</li>
              <li><CheckCircleOutlined /> 特別號碼僅用於開獎結果</li>
            </ul>
          </section>
        </aside>
      </div>

      <Modal
        title="辨識結果校對"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="確認並收錄"
        cancelText="放棄校對"
        okButtonProps={{ className: 'ms-modal-ok' }}
        className="ms-modal"
      >
        <Flex gap="small" wrap>
          {match.map((mat, idx) => (
            <div key={idx} className="ms-ocr-preview">
              <div className="ms-ocr-preview__balls">
                {mat.split('+').map((n, i) => (
                  <Ball key={i} value={n} size="sm" />
                ))}
              </div>
              <input
                value={mat}
                onChange={(event) => handleInputChange(idx, event.target.value)}
                className="ms-ocr-preview__input"
              />
            </div>
          ))}
          {match.length === 0 && <p className="ms-muted">未辨識到注項</p>}
        </Flex>
      </Modal>
    </div>
  );
}

export default Draws;
