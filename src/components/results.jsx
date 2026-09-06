import { useContext, useMemo, useState } from 'react';
import { ResultContext } from '../App';
import Ball from './Ball';
import { padBall, normalizeBallNumber } from '../utils/balls';
import {
  PrinterOutlined,
  FileExcelOutlined,
  ShareAltOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

function Results() {
  const { results, checkHandler, draws, releases } = useContext(ResultContext);
  const [winnersOnly, setWinnersOnly] = useState(false);

  const flat = useMemo(() => {
    const rows = [];
    (results || []).forEach((drawMatches, drawIdx) => {
      if (!drawMatches) return;
      drawMatches.forEach((m, matchIdx) => {
        // Support legacy array shape: [releaseId, ...matchedNums]
        if (Array.isArray(m)) {
          rows.push({
            drawIdx,
            matchIdx,
            legacy: true,
            releaseId: m[0],
            matched: m.slice(1).filter(Boolean),
            prize: null,
            mainHits: m.length - 1,
            specialHit: false,
            drawNums: draws?.[drawIdx]?.map(normalizeBallNumber) || [],
          });
        } else {
          rows.push({ drawIdx, matchIdx, legacy: false, ...m });
        }
      });
    });
    return rows;
  }, [results, draws]);

  const winners = flat.filter((r) => r.prize != null || (r.legacy && r.mainHits >= 3));
  const visible = winnersOnly ? winners : flat;
  const winnerCount = winners.length;

  if (!results || results.length === 0 || flat.length === 0) {
    return (
      <div className="ms-page ms-page--matches">
        <div className="ms-page__head">
          <div>
            <div className="ms-eyebrow">
              <span className="ms-eyebrow__dot" />
              核對工作台
            </div>
            <h1 className="ms-page__title">
              核對中獎
            </h1>
          </div>
          <button type="button" className="ms-btn ms-btn--primary" onClick={() => checkHandler?.()}>
            <ReloadOutlined /> 重新核對
          </button>
        </div>
        <div className="ms-card ms-empty-state">
          <h2>尚未發現符合獎級的注項</h2>
          <p className="ms-muted">
            請先在「我的獎券」與「開獎結果」填入完整資料，再回到此頁核對。
            <br />
            至少對中 3 個主號才會列出（七獎起）。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ms-page ms-page--matches">
      <div className="ms-audit-banner">
        <div>
          <div className="ms-audit-banner__status">
            即時核對完成
          </div>
          <h1 className="ms-audit-banner__title">
            發現 {winnerCount} 張中獎獎券
          </h1>
        </div>
        <div className="ms-audit-banner__stats ms-soon-panel">
          <div>
            <span className="ms-label-caps">總派彩</span>
            <strong>HK$ —</strong>
            <span className="ms-soon-badge">即將推出</span>
          </div>
          <div>
            <span className="ms-label-caps">回報率</span>
            <strong>—</strong>
            <span className="ms-soon-badge">即將推出</span>
          </div>
        </div>
      </div>

      <div className="ms-filter-row">
        <button
          type="button"
          className={`ms-filter${!winnersOnly ? ' is-active' : ''}`}
          onClick={() => setWinnersOnly(false)}
        >
          全部核對（{flat.length}）
        </button>
        <button
          type="button"
          className={`ms-filter${winnersOnly ? ' is-active' : ''}`}
          onClick={() => setWinnersOnly(true)}
        >
          只看中獎（{winnerCount}）
        </button>
        <button type="button" className="ms-btn ms-btn--ghost ms-btn--sm" onClick={() => checkHandler?.()}>
          <ReloadOutlined /> 重新核對
        </button>
      </div>

      <div className="ms-layout">
        <div className="ms-layout__main">
          {visible.map((row) => {
            const drawLine = draws?.[row.drawIdx] || [];
            return (
              <article key={`${row.drawIdx}-${row.matchIdx}`} className="ms-match-card">
                <div className="ms-match-card__meta">
                  <span>
                    注項 #{row.drawIdx + 1} · 期數 {row.releaseId}
                  </span>
                  {row.prize && (
                    <span className="ms-prize-badge">
                      {row.prize.labelZh}
                    </span>
                  )}
                </div>
                <p className="ms-match-card__summary">
                  {row.legacy
                    ? `與期數 ${row.releaseId} 對中的號碼`
                    : `主號 ${row.mainHits} 個${row.specialHit ? ' + 特別號碼' : ''}／對中 ${
                        row.mainHits + (row.specialHit ? 1 : 0)
                      }／7`}
                </p>
                <div className="ms-match-card__balls">
                  {row.legacy
                    ? row.matched.map((n, i) => <Ball key={i} value={n} hit size="md" />)
                    : (row.drawNums || drawLine.map(normalizeBallNumber)).map((n, i) => {
                        const isMainHit = row.matchedMains?.includes(n);
                        const isSpecialHit =
                          row.specialHit && n === row.matchedSpecial;
                        const isHit = isMainHit || isSpecialHit;
                        return (
                          <Ball
                            key={i}
                            value={n}
                            hit={isHit}
                            miss={!isHit}
                            special={isSpecialHit}
                            size="md"
                          />
                        );
                      })}
                </div>
                {!row.legacy && row.releaseMains && (
                  <div className="ms-match-card__official">
                    <span className="ms-label-caps">官方開獎</span>
                    <div className="ms-match-card__balls">
                      {row.releaseMains.map((n, i) => (
                        <Ball
                          key={i}
                          value={n}
                          hit={row.matchedMains?.includes(n)}
                          miss={!row.matchedMains?.includes(n)}
                          size="sm"
                        />
                      ))}
                      <span className="ms-plus">+</span>
                      <Ball
                        value={row.releaseSpecial}
                        special
                        hit={row.specialHit}
                        miss={!row.specialHit}
                        size="sm"
                      />
                    </div>
                  </div>
                )}
                <div className="ms-match-card__foot">
                  <span className="ms-muted">
                    編號 · D{row.drawIdx + 1}-R{padBall(row.releaseId) || row.releaseId}
                  </span>
                  <span className="ms-link ms-soon">領獎指引（即將推出）</span>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="ms-layout__side">
          <section className="ms-card">
            <div className="ms-card__head">
              <h2>官方開獎參考</h2>
            </div>
            {releases?.[0] ? (
              <div className="ms-side-release">
                <span className="ms-badge-id">#{releases[0][0]}</span>
                <div className="ms-match-card__balls">
                  {releases[0].slice(1, 7).map((n, i) => (
                    <Ball key={i} value={n} size="sm" />
                  ))}
                  <span className="ms-plus">+</span>
                  <Ball value={releases[0][7]} special size="sm" />
                </div>
              </div>
            ) : (
              <p className="ms-muted">無開獎資料</p>
            )}
            <div className="ms-side-stats ms-soon-panel">
              <div>
                <span className="ms-label-caps">投注額</span>
                <span>—</span>
                <span className="ms-soon-badge">即將推出</span>
              </div>
              <div>
                <span className="ms-label-caps">下期頭獎</span>
                <span>—</span>
                <span className="ms-soon-badge">即將推出</span>
              </div>
            </div>
          </section>

          <section className="ms-card">
            <div className="ms-card__head">
              <h2>獎級</h2>
            </div>
            <table className="ms-tier-table">
              <thead>
                <tr>
                  <th>獎</th>
                  <th>條件</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', '6 主號'],
                  ['2', '5 + 特別'],
                  ['3', '5 主號'],
                  ['4', '4 + 特別'],
                  ['5', '4 主號'],
                  ['6', '3 + 特別'],
                  ['7', '3 主號'],
                ].map(([t, c]) => {
                  const hit = winners.some((w) => w.prize?.tier === Number(t));
                  return (
                    <tr key={t} className={hit ? 'is-hit' : ''}>
                      <td>{t} 獎</td>
                      <td>{c}{hit ? ' ✓' : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <div className="ms-side-actions">
            <button type="button" className="ms-btn ms-btn--ghost ms-soon" disabled>
              <PrinterOutlined /> 列印報告（即將推出）
            </button>
            <button type="button" className="ms-btn ms-btn--ghost ms-soon" disabled>
              <FileExcelOutlined /> 匯出 CSV（即將推出）
            </button>
            <button type="button" className="ms-btn ms-btn--primary ms-soon" disabled>
              <ShareAltOutlined /> 分享結果（即將推出）
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Results;
