/** HKJC Mark Six ball color groups (1–49). */
export const BALL_RED = new Set([1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]);
export const BALL_BLUE = new Set([3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]);
export const BALL_GREEN = new Set([5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]);

export function normalizeBallNumber(value) {
  if (value === '' || value == null) return null;
  const num = Number(String(value).trim());
  return Number.isFinite(num) ? num : null;
}

export function padBall(value) {
  const n = normalizeBallNumber(value);
  if (n === null) return '';
  return String(n).padStart(2, '0');
}

export function ballColorGroup(value) {
  const n = normalizeBallNumber(value);
  if (n === null) return 'neutral';
  if (BALL_RED.has(n)) return 'red';
  if (BALL_BLUE.has(n)) return 'blue';
  if (BALL_GREEN.has(n)) return 'green';
  return 'neutral';
}

/** Validate six main numbers: integers 1–49, unique. */
export function validateDrawLine(nums) {
  const parsed = nums.map(normalizeBallNumber);
  if (parsed.some((n) => n === null)) {
    return { ok: false, message: '請填滿 6 個號碼 · Fill all 6 numbers' };
  }
  if (parsed.some((n) => n < 1 || n > 49)) {
    return { ok: false, message: '號碼須為 1–49 · Numbers must be 1–49' };
  }
  if (new Set(parsed).size !== parsed.length) {
    return { ok: false, message: '號碼不可重複 · Numbers must be unique' };
  }
  return { ok: true };
}

/** Validate release: id + 6 mains + special. */
export function validateReleaseLine(fields) {
  if (!fields[0] || String(fields[0]).trim() === '') {
    return { ok: false, message: '請輸入期數 · Enter draw ID' };
  }
  const mains = fields.slice(1, 7).map(normalizeBallNumber);
  const special = normalizeBallNumber(fields[7]);
  if (mains.some((n) => n === null) || special === null) {
    return { ok: false, message: '請填滿 6 主號 + 特別號碼 · Fill 6 mains + special' };
  }
  if ([...mains, special].some((n) => n < 1 || n > 49)) {
    return { ok: false, message: '號碼須為 1–49 · Numbers must be 1–49' };
  }
  if (new Set(mains).size !== mains.length) {
    return { ok: false, message: '主號不可重複 · Main numbers must be unique' };
  }
  if (mains.includes(special)) {
    return { ok: false, message: '特別號碼不可與主號重複 · Special cannot duplicate a main' };
  }
  return { ok: true };
}

/**
 * Mark Six prize tiers (standard HKJC single ticket):
 * 1st: 6 mains | 2nd: 5+S | 3rd: 5 | 4th: 4+S | 5th: 4 | 6th: 3+S | 7th: 3
 */
export function getPrizeTier(mainHits, specialHit) {
  if (mainHits === 6) return { tier: 1, labelZh: '頭獎', labelEn: '1st Prize' };
  if (mainHits === 5 && specialHit) return { tier: 2, labelZh: '二獎', labelEn: '2nd Prize' };
  if (mainHits === 5) return { tier: 3, labelZh: '三獎', labelEn: '3rd Prize' };
  if (mainHits === 4 && specialHit) return { tier: 4, labelZh: '四獎', labelEn: '4th Prize' };
  if (mainHits === 4) return { tier: 5, labelZh: '五獎', labelEn: '5th Prize' };
  if (mainHits === 3 && specialHit) return { tier: 6, labelZh: '六獎', labelEn: '6th Prize' };
  if (mainHits === 3) return { tier: 7, labelZh: '七獎', labelEn: '7th Prize' };
  return null;
}
