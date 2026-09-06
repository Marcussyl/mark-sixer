import Release from './release.jsx';
import { useState, useContext } from 'react';
import {
  PlusOutlined,
  SyncOutlined,
  ClearOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import { ReleaseContext } from '../App.jsx';

function Releases() {
  const {
    releases,
    addRelease,
    setReleases,
    clearReleases,
    releaseInputRef,
    openMessage,
  } = useContext(ReleaseContext);
  const [retCount, setRetCount] = useState(5);
  const [fetching, setFetching] = useState(false);

  const handleMenuClick = (e) => {
    setRetCount(Number(e.key));
  };

  const handleButtonClick = async () => {
    try {
      setFetching(true);
      openMessage('getReleases', 'loading', 'Getting draw results...', 0);
      const url = `https://mark-six-results-scraper.netlify.app/api/mark-six-results?count=${retCount}`;
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        setTimeout(() => openMessage('getReleases', 'error', errorMessage), 100);
        return;
      }

      const data = await response.json();
      if (data.length === 0) {
        openMessage('getReleases', 'error', 'No draw results retrieved, please try again');
        return;
      }

      const transformedData = data.map((item) => {
        const id = item.id.split('/')[1];
        // Ensure 8 fields: id + 6 mains + special
        const results = [...item.results];
        while (results.length < 7) results.push('');
        return [id, ...results.slice(0, 7)];
      });

      setTimeout(() => {
        openMessage('getReleases', 'success', 'Get draw results successfully');
      }, 100);
      releaseInputRef.current.push(
        ...Array.from({ length: transformedData.length }, () => [])
      );
      setReleases([...transformedData, ...releases]);
    } catch (error) {
      console.error('Error fetching data:', error);
      openMessage('getReleases', 'error', 'Error fetching data');
    } finally {
      setFetching(false);
    }
  };

  const menuItems = Array.from({ length: 10 }, (_, index) => ({
    label: `最近 ${index + 1} 期`,
    key: String(index + 1),
  }));

  return (
    <div className="ms-page ms-page--releases">
      <div className="ms-page__head">
        <div>
          <div className="ms-eyebrow">
            <span className="ms-eyebrow__dot" />
            OFFICIAL HKJC LEDGER
            <span className="ms-eyebrow__sep">·</span>
            <span className="ms-eyebrow__zh">權威官方獎號資料庫</span>
          </div>
          <div className="ms-page__title-row">
            <h1 className="ms-page__title">
              開獎結果 <span>Releases</span>
            </h1>
            <span className="ms-chip ms-soon">
              <span className="ms-sync-badge__dot" />
              HKJC Live Feed · Soon
            </span>
          </div>
        </div>
      </div>

      <div className="ms-toolbar ms-card">
        <div className="ms-toolbar__left">
          <button
            type="button"
            className="ms-btn ms-btn--primary"
            onClick={handleButtonClick}
            disabled={fetching}
          >
            <SyncOutlined spin={fetching} />
            獲取最新結果 Sync Official
          </button>
          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick, selectedKeys: [String(retCount)] }}
          >
            <button type="button" className="ms-btn ms-btn--ghost">
              最近 {retCount} 期 ▾
            </button>
          </Dropdown>
        </div>
        <div className="ms-toolbar__right">
          <button type="button" className="ms-btn ms-btn--ghost" onClick={addRelease}>
            <PlusOutlined />
            手動輸入開獎 + Manual Add
          </button>
          <Tooltip title="全部清除">
            <button
              type="button"
              className="ms-icon-btn"
              onClick={() => {
                clearReleases?.();
                setReleases([]);
              }}
            >
              <ClearOutlined />
            </button>
          </Tooltip>
          <Tooltip title="匯出 · use footer / float Export">
            <button type="button" className="ms-icon-btn ms-soon" disabled>
              <DownloadOutlined />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="ms-release-list">
        {releases.length === 0 && (
          <div className="ms-empty ms-card">尚未載入開獎 · Fetch or add manually</div>
        )}
        {releases.map((_, idx) => (
          <Release key={idx} id={idx} />
        ))}
      </div>

      <div className="ms-card ms-dual-engine">
        <div>
          <strong>Dual-Engine Ledger</strong>
          <p className="ms-muted">
            官方結果經 scraper API 拉取並存於本機 localStorage。獎金／投注額帳本為預覽。
          </p>
        </div>
        <span className="ms-chip ms-soon">本地 SQLite IndexedDB · Soon</span>
      </div>
    </div>
  );
}

export default Releases;
