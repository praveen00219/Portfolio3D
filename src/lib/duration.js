const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// "Sep 2025" → months since year 0; "Present" → the current month. null if unrecognised.
function toMonth(s, now) {
  s = s.trim();
  if (/^present$/i.test(s)) return now.getFullYear() * 12 + now.getMonth();
  const m = s.match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/);
  const mi = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  return mi < 0 ? null : Number(m[2]) * 12 + mi;
}

// "Sep 2025 — Jun 2026" → "10 mos". Counts both end months, like LinkedIn. "" if the period can't be parsed.
export function periodDuration(period, now = new Date()) {
  const [from = "", to = ""] = period.split(/\s*[—–-]\s*/);
  const start = toMonth(from, now);
  const end = toMonth(to, now);
  if (start == null || end == null || end < start) return "";
  const total = end - start + 1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "nths" : ""}`].filter(Boolean).join(" ");
}
