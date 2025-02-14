import type { TimeZones } from "../timezones/tztype.js";
import { getOffset } from "../timezones/index.js";
import secularDiff from "./secular-diff.js";
import type { CalendarTypes } from "./types.js";
/**
 * Convert a Julian Date to a date and time in a specific time zone.
 * @param jd The Julian Date to convert.
 * @param tz The time zone offset in hours to use for the conversion. If not
 * provided, this defaults to GMT.
 * @returns An object with the following properties: year, month, day, hour,
 * minute, second.
 */
export function julianTogregorian(
  jd: number,
  tz?: TimeZones
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const _tzz: TimeZones = tz ?? "GMT";
  const tzz = getOffset(_tzz);
  const jdd = jd + tzz / 24;
  // JDN to Year Month Date
  const jdn = Math.round(jdd);

  const a = 4 * jdn - 6884477;
  const x3 = Math.floor(a / 146097);
  const r3 = a % 146097;

  const b = 100 * Math.floor(r3 / 4) + 99;
  const x2 = Math.floor(b / 36525);
  const r2 = b % 36525;

  const c = 5 * Math.floor(r2 / 100) + 2;
  const x1 = Math.floor(c / 153);
  const r1 = c % 153;

  const cc = Math.floor((x1 + 2) / 12);
  const year = 100 * x3 + x2 + cc;
  const month = x1 - 12 * cc + 3;
  const day = Math.floor(r1 / 5) + 1;

  // decimal fraction of JD to Hour Minute Second
  const j = Math.floor(jdd);
  const fjdn = jdd - j;
  const xx1 =
    fjdn >= 0.5 ? (fjdn * 86400 - 43200) / 3600 : (fjdn * 86400 + 43200) / 3600;
  const hour = Math.floor(xx1);
  const xx2 = (xx1 - hour) * 3600;
  const xx3 = xx2 / 60;
  const minute = Math.floor(xx3);
  const second = Math.floor((xx3 - minute) * 60);
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
}

/**
 * Convert a Julian Day to a date-time object.
 *
 * @param jd The Julian Day to convert.
 * @param tz The timezone offset in hours. Defaults to 0 (UTC).
 * @param ct The calendar type. Defaults to "Gregorian".
 * @returns An object with the following properties: year, month, date, hour, minute, second, and string.
 * The string property is a string representation of the date and time in the format "Month Day, Year Hour:Minute:Second".
 */
export function julian2DateTimeString(
  jd: number,
  tz?: TimeZones,
  ct?: CalendarTypes
): {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  string: string;
} {
  const tzz = tz ?? "GMT";
  const ctt = ct ?? "Gregorian";
  const _sg = 2361222;
  const ma: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const g = julianTogregorian(jd, tzz);
  const g2 = julianTogregorian(jd - secularDiff(g.year), tzz);
  const g3 = ctt === "Julian" || (ctt === "British" && jd < _sg) ? g2 : g;
  const mo = ma[g3.month - 1];
  const h = g3.hour.toString().length === 1 ? `0${g3.hour}` : `${g3.hour}`;
  const mi =
    g3.minute.toString().length === 1 ? `0${g3.minute}` : `${g3.minute}`;
  const s =
    g3.second.toString().length === 1 ? `0${g3.second}` : `${g3.second}`;
  const str: string = `${mo} ${g3.day} , ${g3.year} , ${h}:${mi}:${s}`;
  return {
    year: g3.year,
    month: g3.month,
    date: g3.day,
    hour: g3.hour,
    minute: g3.minute,
    second: g3.second,
    string: str,
  };
}
