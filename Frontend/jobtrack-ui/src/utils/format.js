const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// "2026-09-18" -> "18 Sep 2026"
export function formatDate(value) {
  if (!value) return "";
  const [y, m, d] = value.slice(0, 10).split("-");
  return `${parseInt(d, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

// "2026-09-20T11:00:00" -> "20 Sep 2026 · 11:00 AM"
export function formatDateTime(value) {
  if (!value) return "";
  const [h, min] = value.slice(11, 16).split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${formatDate(value)} · ${h12}:${String(min).padStart(2, "0")} ${ampm}`;
}
