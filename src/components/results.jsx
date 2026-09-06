import { useContext, useEffect, useMemo, useState } from 'react';
import { ResultContext } from '../App';
import Ball from './Ball';
import {
  padBall,
  normalizeBallNumber,
  formatPrizeBadge,
  summarizeFixedWinnings,
  FIXED_PRIZE_HKD,
} from '../utils/balls';
import {
  PrinterOutlined,
  FileExcelOutlined,
  ShareAltOutlined,
  ReloadOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const TIER_ROWS = [
  { tier: 1, label: '頭獎', condition: '6 個主號碼', amount: '浮動' },
  { tier: 2, label: '二獎', condition: '5 個主號碼 + 特別號碼', amount: '浮動' },
  { tier: 3, label: '三獎', condition: '5 個主號碼', amount: '浮動' },
  { tier: 4, label: '四獎', condition: '4 個主號碼 + 特別號碼', amount: '浮動' },
  { tier: 5, label: '五獎', condition: '4 個主號碼', amount: `固定 HK$${FIXED_PRIZE_HKD[5]}` },
  { tier: 6, label: '六獎', condition: '3 個主號碼 + 特別號碼', amount: `固定 HK$${FIXED_PRIZE_HKD[6]}` },
  { tier: 7, label: '七獎', condition: '3 個主號碼', amount: `固定 HK$${FIXED_PRIZE_HKD[7]}` },
];

function Results() {
  const { results, checkHandler, draws, releases } = useContext(ResultContext);
  /** null = 全部注項; string id = selected release period */
  const [selectedReleaseId, setSelectedReleaseId] = useState(null);
  const [winnersOnly, setWinnersOnly] = useState(false);
  const [didInitRelease, setDidInitRelease] = useState(false);

  const flat = useMemo(() => {
    const rows = [];
    (results || []).forEach((drawMatches, drawIdx) => {
      if (!drawMatches) return;
      drawMatches.forEach((m, matchIdx) => {
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

  const releaseIds = useMemo(() => {
    const ids = [];
    const seen = new Set();
    flat.forEach((r) => {
      const id = String(r.releaseId ?? '');
      if (id && !seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    });
    (releases || []).forEach((rel) => {
      const id = String(rel?.[0] ?? '');
      if (id && !seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    });
    return ids;
  }, [flat, releases]);

  // Default to first release so sidebar + subtitle are period-scoped
  useEffect(() => {
    if (!didInitRelease && releaseIds.length > 0) {
      setSelectedReleaseId(releaseIds[0]);
      setDidInitRelease(true);
    }
  }, [releaseIds, didInitRelease]);

  const releaseScoped = useMemo(() => {
    if (selectedReleaseId == null) return flat;
    return flat.filter((r) => String(r.releaseId) === String(selectedReleaseId));
  }, [flat, selectedReleaseId]);

  const winnersAll = flat.filter(
    (r) => r.prize != null || (r.legacy && r.mainHits >= 3)
  );
  const winnersScoped = releaseScoped.filter(
    (r) => r.prize != null || (r.legacy && r.mainHits >= 3)
  );

  const visible = winnersOnly
    ? selectedReleaseId == null
      ? winnersAll
      : winnersScoped
    : releaseScoped;

  const winnerCountAll = winnersAll.length;
  const compareCount = releaseScoped.length;

  const winSummary = useMemo(
    () =>
      summarizeFixedWinnings(
        selectedReleaseId == null ? winnersAll : winnersScoped
      ),
    [selectedReleaseId, winnersAll, winnersScoped]
  );

  const sidebarReleaseId =
    selectedReleaseId ?? releaseIds[0] ?? null;

  const selectedRelease =
    (releases || []).find(
      (r) => String(r?.[0]) === String(sidebarReleaseId)
    ) ||
    releases?.[0] ||
    null;

  const hitTiers = useMemo(() => {
    const set = new Set();
    const source =
      selectedReleaseId == null ? winnersAll : winnersScoped;
    source.forEach((w) => {
      if (w.prize?.tier) set.add(w.prize.tier);
    });
    return set;
  }, [selectedReleaseId, winnersAll, winnersScoped]);

  const scopedWinnerCount =
    selectedReleaseId == null ? winnerCountAll : winnersScoped.length;

  const totalAmountDisplay = (() => {
    if (winSummary.fixedTotal > 0 && !winSummary.hasFloating) {
      return `HK$${winSummary.fixedTotal.toLocaleString('en-HK')}`;
    }
    if (winSummary.fixedTotal > 0 && winSummary.hasFloating) {
      return `HK$${winSummary.fixedTotal.toLocaleString('en-HK')}+`;
    }
    if (winSummary.hasFloating) return '浮動';
    if (scopedWinnerCount === 0) return 'HK$0';
    return '即將推出';
  })();

  if (!results || results.length === 0 || flat.length === 0) {
    return (
      <div className="ms-page ms-page--matches">
        <div className="ms-page__head">
          <div>
            <div className="ms-eyebrow">
              <span className="ms-eyebrow__dot" />
              核對工作台
            </div>
            <h1 className="ms-page__title">核對中獎</h1>
          </div>
          <button
            type="button"
            className="ms-btn ms-btn--primary"
            onClick={() => checkHandler?.()}
          >
            <ReloadOutlined /> 重新核對
          </button>
        </div>
        <div className="ms-card ms-empty-state">
          <h2>尚未有可核對的注項</h2>
          <p className="ms-muted">
            請先在「我的獎券」與「開獎結果」填入完整資料，再回到此頁核對。
            <br />
            核對後會同時顯示中獎與未中獎注項。
          </p>
        </div>
      </div>
    );
  }

  const periodLabel =
    selectedReleaseId != null
      ? selectedReleaseId
      : sidebarReleaseId || '—';

  return (
    <div className="ms-page ms-page--matches">
      <div className="ms-audit-banner">
        <div className="ms-audit-banner__left">
          <div className="ms-audit-banner__icon" aria-hidden>
            <TrophyOutlined />
          </div>
          <div>
            <h1 className="ms-audit-banner__title">
              發現 {scopedWinnerCount} 張中獎獎券
            </h1>
            <p className="ms-audit-banner__sub">
              {selectedReleaseId != null
                ? `已針對第 ${periodLabel} 期攪珠官方結果完成 ${compareCount} 筆注項比對`
                : `已完成 ${flat.length} 筆注項比對（全部期數）`}
            </p>
          </div>
        </div>
        <div className="ms-audit-banner__stats">
          <div>
            <span className="ms-label-caps">中獎總金額</span>
            <strong>{totalAmountDisplay}</strong>
            {(winSummary.hasFloating ||
              (scopedWinnerCount > 0 && winSummary.fixedTotal === 0)) && (
              <span className="ms-soon-badge">浮動／即將推出</span>
            )}
          </div>
          <div>
            <span className="ms-label-caps">總回報率</span>
            <strong>即將推出</strong>
            <span className="ms-soon-badge">即將推出</span>
          </div>
        </div>
      </div>

      <div className="ms-filter-row">
        <button
          type="button"
          className={`ms-filter${
            selectedReleaseId == null && !winnersOnly ? ' is-active' : ''
          }`}
          onClick={() => {
            setSelectedReleaseId(null);
            setWinnersOnly(false);
          }}
        >
          全部注項（{flat.length}）
        </button>
        {releaseIds.map((id) => {
          const count = flat.filter((r) => String(r.releaseId) === id).length;
          return (
            <button
              key={id}
              type="button"
              className={`ms-filter${
                !winnersOnly && String(selectedReleaseId) === String(id)
                  ? ' is-active'
                  : ''
              }`}
              onClick={() => {
                setSelectedReleaseId(id);
                setWinnersOnly(false);
              }}
            >
              第 {id} 期（{count}）
            </button>
          );
        })}
        <button
          type="button"
          className={`ms-filter${winnersOnly ? ' is-active' : ''}`}
          onClick={() => setWinnersOnly(true)}
        >
          僅顯示中獎注項（
          {selectedReleaseId == null ? winnerCountAll : winnersScoped.length}）
        </button>
        <button
          type="button"
          className="ms-btn ms-btn--ghost ms-btn--sm"
          onClick={() => checkHandler?.()}
        >
          <ReloadOutlined /> 重新核對
        </button>
      </div>

      <div className="ms-layout ms-layout--matches">
        <div className="ms-layout__main">
          {visible.length === 0 ? (
            <div className="ms-card ms-empty-state">
              <h2>此篩選下沒有注項</h2>
              <p className="ms-muted">
                試試切換期數，或取消「僅顯示中獎注項」。
              </p>
            </div>
          ) : (
            visible.map((row) => {
              const drawLine = draws?.[row.drawIdx] || [];
              const drawNums =
                row.drawNums || drawLine.map(normalizeBallNumber);
              const specialHitFlag = !!row.specialHit;
              const badge = formatPrizeBadge(
                row.prize,
                row.mainHits,
                specialHitFlag
              );
              const isWinner = row.prize != null;

              return (
                <article
                  key={`${row.drawIdx}-${row.matchIdx}-${row.releaseId}`}
                  className={`ms-match-card${
                    isWinner ? ' is-winner' : ' is-miss'
                  }`}
                >
                  <div className="ms-match-card__meta">
                    <span className="ms-match-card__label">
                      注項 {row.drawIdx + 1} · 獎券
                    </span>
                    <span
                      className={`ms-prize-badge${
                        isWinner ? '' : ' ms-prize-badge--miss'
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                  <p className="ms-match-card__summary">
                    {row.legacy
                      ? `與期數 ${row.releaseId} 對中的號碼`
                      : `命中統計：${row.mainHits || 0} 個主號碼 + ${
                          specialHitFlag ? 1 : 0
                        } 個特別號碼`}
                  </p>
                  <div className="ms-match-card__balls ms-match-card__balls--captioned">
                    {row.legacy
                      ? row.matched.map((n, i) => (
                          <Ball key={i} value={n} hit size="md" />
                        ))
                      : drawNums.map((n, i) => {
                          const isMainHit = row.matchedMains?.includes(n);
                          const isSpecialHit =
                            specialHitFlag && n === row.matchedSpecial;
                          const isHit = isMainHit || isSpecialHit;
                          return (
                            <Ball
                              key={i}
                              value={n}
                              hit={isHit}
                              miss={!isHit}
                              special={isSpecialHit}
                              caption={isSpecialHit ? '特別' : undefined}
                              size="md"
                            />
                          );
                        })}
                  </div>
                  <div className="ms-match-card__foot">
                    <span className="ms-muted">
                      期數 {row.releaseId} · D{row.drawIdx + 1}-R
                      {padBall(row.releaseId) || row.releaseId}
                    </span>
                    <span className="ms-link ms-soon">領獎指引 · 即將推出</span>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <aside className="ms-layout__side">
          <section className="ms-card">
            <div className="ms-card__head">
              <h2>官方開獎</h2>
              {selectedRelease?.[0] != null && (
                <span className="ms-badge-id">#{selectedRelease[0]}</span>
              )}
            </div>
            {selectedRelease ? (
              <div className="ms-side-release">
                <div className="ms-match-card__balls ms-match-card__balls--captioned">
                  {selectedRelease.slice(1, 7).map((n, i) => (
                    <Ball key={i} value={n} size="sm" />
                  ))}
                  <span className="ms-plus">+</span>
                  <Ball
                    value={selectedRelease[7]}
                    special
                    size="sm"
                    caption="特別"
                  />
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
                  <th>獎級</th>
                  <th>條件</th>
                  <th>獎金</th>
                </tr>
              </thead>
              <tbody>
                {TIER_ROWS.map((row) => {
                  const hit = hitTiers.has(row.tier);
                  return (
                    <tr key={row.tier} className={hit ? 'is-hit' : ''}>
                      <td>
                        {row.label}
                        {hit ? ' ✓' : ''}
                      </td>
                      <td>{row.condition}</td>
                      <td>{row.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <div className="ms-side-actions">
            <button
              type="button"
              className="ms-btn ms-btn--ghost ms-soon"
              disabled
            >
              <PrinterOutlined /> 列印報表 · 即將推出
            </button>
            <button
              type="button"
              className="ms-btn ms-btn--ghost ms-soon"
              disabled
            >
              <FileExcelOutlined /> 匯出 CSV · 即將推出
            </button>
            <button
              type="button"
              className="ms-btn ms-btn--primary ms-soon"
              disabled
            >
              <ShareAltOutlined /> 分享核對結果 · 即將推出
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Results;
