import type { TimeZones } from "../timezones/tztype.js";
import secularDiff from "./secular-diff.js";
import { getOffset } from "../timezones/index.js";
import type { GregorianToJulianOptions, CalendarTypes } from "./types.js";

/**
 * Converts a Gregorian date and time to a Julian Day Number (JDN) and a
 * Julian Date (JD).
 *
 * The function takes a Gregorian year, month, day, hour, minute, and second,
 * and returns the corresponding Julian Day Number (JDN) and Julian Date (JD).
 *
 * The function also takes an optional time zone and calendar type. If a time
 * zone is provided, the function will calculate the offset of the given time
 * zone from the local time zone and add it to the Julian Day Number and Date.
 * If a calendar type is provided, the function will use the secular difference
 * between the Julian period and the given calendar type to calculate the
 * Julian Day Number and Date.
 *
 * @param {GregorianToJulianOptions} options An object with the following
 * properties.
 * @param {number} options.year The Gregorian year.
 * @param {number} options.month The Gregorian month, 1-12.
 * @param {number} options.day The Gregorian day, 1-31.
 * @param {number} [options.hour] The hour, 0-23. Defaults to 12.
 * @param {number} [options.minute] The minute, 0-59. Defaults to 0.
 * @param {number} [options.second] The second, 0-59. Defaults to 0.
 * @param {TimeZones} [options.timeZone] The time zone to use. Defaults to "GMT".
 * @param {CalendarTypes} [options.calendarType] The calendar type to use.
 * Defaults to "Gregorian".
 * @returns {{jd: number, jdn: number}} An object with the following properties:
 * @returns {number} jd The Julian Date.
 * @returns {number} jdn The Julian Day Number.
 */
export function gregorian2Julian({
  year,
  month,
  day,
  hour,
  minute,
  second,
  timeZone,
  calendarType,
}: GregorianToJulianOptions): { jd: number; jdn: number } {
  const _sg = 2361222;
  // setting default values
  const h: number = hour ?? 12;
  const m: number = minute ?? 0;
  const s: number = second ?? 0;
  const ctt: CalendarTypes = calendarType ?? "Gregorian";
  const tzz: TimeZones = timeZone ?? "GMT";
  const tz: number = getOffset(tzz);
  // secular difference for calendar types
  const d: number = secularDiff(year);
  // To decimal fraction of the day
  // h , m , s
  const df: number = (h - 12) / 24 + m / 1440 + s / 86400;
  // given tz offset
  const dftz: number = tz / 24;
  // pre jdn
  const a: number = Math.floor((month - 3) / 12);
  const x4: number = year + a;
  const x3: number = Math.floor(x4 / 100);
  const x2: number = x4 % 100;
  const x1: number = month - 12 * a - 3;
  const _jdn: number =
    Math.floor((146097 * x3) / 4) +
    Math.floor((36525 * x2) / 100) +
    Math.floor((153 * x1 + 2) / 5) +
    day +
    1721119;
  // pre jd with decimal fraction of h,m,s and local tz offset, given tz offset
  const _jd: number = _jdn + df + dftz;
  // check calendar type and if pre jd lass than 2361222 + secular difference
  // Gregorian date 1752-Sep-14 JDN = 2361222
  const jd: number =
    ctt === "Julian" || (ctt === "British" && _jd < _sg) ? _jd + d : _jd;
  // make sure jdn with tz and calendar type
  const jdn: number = Math.round(jd);
  return {
    jd,
    jdn,
  };
}
