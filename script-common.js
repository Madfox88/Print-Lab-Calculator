// =========================================================
// COMMON HELPERS (shared by all calculators)
// =========================================================

function clampLanes(value, maxLanes) {
  const v = Number(value);
  if (!Number.isFinite(v) || v < 0) return 0;
  if (maxLanes != null && v > maxLanes) return maxLanes;
  return v;
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("da-DK");
}

function roundUpToNext10(x) {
  return Math.ceil(x / 10) * 10;
}
