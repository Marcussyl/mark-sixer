import PropTypes from 'prop-types';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { ReleaseContext } from '../App';
import { useContext } from 'react';
import { Tooltip } from 'antd';
import Ball from './Ball';
import { normalizeBallNumber } from '../utils/balls';

function Release({ id }) {
  const { releases, updateRelease, deleteRelease, releaseInputRef } =
    useContext(ReleaseContext);
  const release = releases[id];
  // Ensure 8 slots (id + 6 mains + special) for older 7-slot data
  const row = [...release];
  while (row.length < 8) row.push('');

  function copyLine() {
    const text = row.join(' ');
    navigator.clipboard?.writeText(text);
  }

  return (
    <article className="ms-release-card">
      <div className="ms-release-card__top">
        <div className="ms-release-card__id">
          <span className="ms-badge-id">
            <input
              type="tel"
              inputMode="numeric"
              maxLength={3}
              className="ms-id-input"
              value={row[0]}
              placeholder="期"
              ref={(el) => {
                if (!releaseInputRef.current[id]) releaseInputRef.current[id] = [];
                releaseInputRef.current[id][0] = el;
              }}
              onChange={(event) => updateRelease(id, 0, event.target.value)}
              aria-label={`Release ${id + 1} draw ID`}
            />
          </span>
          <span className="ms-muted">開獎期數 Draw #{id + 1}</span>
        </div>
        <div className="ms-row__actions">
          <Tooltip title="複製 · Copy">
            <button type="button" className="ms-icon-btn ms-icon-btn--sm" onClick={copyLine}>
              <CopyOutlined />
            </button>
          </Tooltip>
          <Tooltip title="刪除 · Delete">
            <button
              type="button"
              className="ms-icon-btn ms-icon-btn--sm ms-icon-btn--danger"
              onClick={() => deleteRelease(id)}
            >
              <DeleteOutlined />
            </button>
          </Tooltip>
          <span className="ms-icon-btn ms-icon-btn--sm ms-soon" aria-disabled title="Share Soon">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>share</span>
          </span>
        </div>
      </div>

      <div className="ms-release-card__balls">
        {row.slice(1, 7).map((val, i) => {
          const fieldIdx = i + 1;
          return (
            <div key={fieldIdx} className="ms-cell">
              {normalizeBallNumber(val) !== null ? <Ball value={val} size="md" /> : null}
              <input
                type="tel"
                inputMode="numeric"
                maxLength={2}
                className={`ms-cell__input${normalizeBallNumber(val) !== null ? ' is-overlaid' : ''}`}
                value={val}
                ref={(el) => {
                  if (!releaseInputRef.current[id]) releaseInputRef.current[id] = [];
                  releaseInputRef.current[id][fieldIdx] = el;
                }}
                onChange={(event) => updateRelease(id, fieldIdx, event.target.value)}
                aria-label={`Release ${id + 1} main ${i + 1}`}
              />
            </div>
          );
        })}
        <span className="ms-plus" aria-hidden>+</span>
        <div className="ms-cell ms-cell--special">
          {normalizeBallNumber(row[7]) !== null ? (
            <Ball value={row[7]} special size="md" />
          ) : null}
          <input
            type="tel"
            inputMode="numeric"
            maxLength={2}
            className={`ms-cell__input ms-cell__input--special${normalizeBallNumber(row[7]) !== null ? ' is-overlaid' : ''}`}
            value={row[7]}
            ref={(el) => {
              if (!releaseInputRef.current[id]) releaseInputRef.current[id] = [];
              releaseInputRef.current[id][7] = el;
            }}
            onChange={(event) => updateRelease(id, 7, event.target.value)}
            aria-label={`Release ${id + 1} special`}
          />
          <span className="ms-special-label">特別號碼 SPECIAL</span>
        </div>
      </div>

      <div className="ms-release-card__ledger ms-soon-panel">
        <div>
          <span className="ms-label-caps">頭獎派彩 1ST PRIZE</span>
          <span className="ms-soon-badge">Soon</span>
        </div>
        <div>
          <span className="ms-label-caps">二獎 / 三獎</span>
          <span className="ms-muted">—</span>
        </div>
        <div>
          <span className="ms-label-caps">TURNOVER</span>
          <span className="ms-muted">—</span>
        </div>
      </div>
    </article>
  );
}

Release.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Release;
