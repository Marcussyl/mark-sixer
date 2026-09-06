import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DrawContext } from '../App';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Ball from './Ball';
import { normalizeBallNumber } from '../utils/balls';

function Draw({ id }) {
  const { draws, deleteDraw, updateDraw, drawInputRef } = useContext(DrawContext);
  const draw = draws[id];
  const filled = draw.every((v) => normalizeBallNumber(v) !== null);

  function copyLine() {
    const text = draw.map((v) => String(v).padStart(2, '0')).join('+');
    navigator.clipboard?.writeText(text);
  }

  return (
    <div className={`ms-row ms-row--draw${filled ? ' is-filled' : ''}`}>
      <span className="ms-row__idx">{String(id + 1).padStart(2, '0')}</span>
      <div className="ms-row__balls">
        {draw.map((val, fieldIdx) => (
          <div key={fieldIdx} className="ms-cell">
            {normalizeBallNumber(val) !== null ? (
              <Ball value={val} size="md" />
            ) : null}
            <input
              type="tel"
              inputMode="numeric"
              maxLength={2}
              className={`ms-cell__input${normalizeBallNumber(val) !== null ? ' is-overlaid' : ''}`}
              value={val}
              ref={(el) => {
                if (!drawInputRef.current[id]) drawInputRef.current[id] = [];
                drawInputRef.current[id][fieldIdx] = el;
              }}
              onChange={(event) => updateDraw(id, fieldIdx, event.target.value)}
              aria-label={`Draw ${id + 1} number ${fieldIdx + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="ms-row__actions">
        <Tooltip title="複製 · Copy">
          <button type="button" className="ms-icon-btn ms-icon-btn--sm" onClick={copyLine} aria-label="Copy">
            <CopyOutlined />
          </button>
        </Tooltip>
        <Tooltip title="刪除 · Delete">
          <button
            type="button"
            className="ms-icon-btn ms-icon-btn--sm ms-icon-btn--danger"
            onClick={() => deleteDraw(id)}
            aria-label="Delete"
          >
            <DeleteOutlined />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

Draw.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Draw;
