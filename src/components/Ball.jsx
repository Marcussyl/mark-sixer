import PropTypes from 'prop-types';
import { ballColorGroup, padBall, normalizeBallNumber } from '../utils/balls';

/**
 * HKJC-colored lottery ball. Use `special` for the 7th (特別號碼) coral ring.
 * `hit` / `miss` for Matches evaluation states.
 * Optional `caption` renders a micro-label under the ball (e.g. 特別).
 */
function Ball({ value, special = false, hit, miss, size = 'md', empty = false, caption }) {
  const n = normalizeBallNumber(value);
  const display = empty || n === null ? '' : padBall(value);
  const group = empty || n === null ? 'neutral' : ballColorGroup(value);
  const showCaption = caption != null && caption !== '';
  const classes = [
    'ms-ball',
    `ms-ball--${size}`,
    `ms-ball--${group}`,
    special ? 'ms-ball--special' : '',
    hit === true ? 'ms-ball--hit' : '',
    miss === true ? 'ms-ball--miss' : '',
    empty || n === null ? 'ms-ball--empty' : '',
    showCaption ? 'ms-ball--captioned' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} title={special ? '特別號碼' : undefined}>
      <span className="ms-ball__num">{display || '··'}</span>
      {showCaption && <span className="ms-ball__caption">{caption}</span>}
    </span>
  );
}

Ball.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  special: PropTypes.bool,
  hit: PropTypes.bool,
  miss: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  empty: PropTypes.bool,
  caption: PropTypes.string,
};

export default Ball;
