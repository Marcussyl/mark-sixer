import PropTypes from 'prop-types';
import { ballColorGroup, padBall, normalizeBallNumber } from '../utils/balls';

/**
 * HKJC-colored lottery ball. Use `special` for the 7th (特別號碼) coral ring.
 * `hit` / `miss` for Matches evaluation states.
 */
function Ball({ value, special = false, hit, miss, size = 'md', empty = false }) {
  const n = normalizeBallNumber(value);
  const display = empty || n === null ? '' : padBall(value);
  const group = empty || n === null ? 'neutral' : ballColorGroup(value);
  const classes = [
    'ms-ball',
    `ms-ball--${size}`,
    `ms-ball--${group}`,
    special ? 'ms-ball--special' : '',
    hit === true ? 'ms-ball--hit' : '',
    miss === true ? 'ms-ball--miss' : '',
    empty || n === null ? 'ms-ball--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} title={special ? '特別號碼 Special' : undefined}>
      <span className="ms-ball__num">{display || '··'}</span>
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
};

export default Ball;
