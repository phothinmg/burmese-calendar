function get_offset(timeZone) {
  const now = /* @__PURE__ */ new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 36e5;
  const offset = diff + now.getTimezoneOffset() / 60;
  return -offset;
}

function gregorianToJulian({
  year,
  month,
  day,
  hour,
  minute,
  second,
  timeZone,
  calendarType,
}) {
  const h = hour ?? 12;
  const m = minute ?? 0;
  const s = second ?? 0;
  const ctt = calendarType ?? "Gregorian";
  const tzz = timeZone ?? "GMT";
  const tz = get_offset(tzz);
  const d = utils.secularDiff(year);
  const df = (h - 12) / 24 + m / 1440 + s / 86400;
  const dftz = tz / 24;
  const a = Math.floor((month - 3) / 12);
  const x4 = year + a;
  const x3 = Math.floor(x4 / 100);
  const x2 = x4 % 100;
  const x1 = month - 12 * a - 3;
  const _jdn =
    Math.floor((146097 * x3) / 4) +
    Math.floor((36525 * x2) / 100) +
    Math.floor((153 * x1 + 2) / 5) +
    day +
    1721119;
  const _jd = _jdn + df + dftz;
  const jd =
    ctt === "Julian" || (ctt === "British" && _jd < utils.SG) ? _jd + d : _jd;
  const jdn = Math.round(jd);
  return {
    jd,
    jdn,
  };
}
var gregorian_julian_default = gregorianToJulian;
