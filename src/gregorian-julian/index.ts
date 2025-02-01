import { get_offset } from "../timezones/index.js";
import type { TimeZones } from "../timezones/typetz.js";
import { utils } from "../utils/index.js";
//
export type CalendarTypes = "British" | "Gregorian" | "Julian";
/**
 * Gregorian to Julian Options
 */
export type GregorianToJulianOptions = {
	/**
	 * Year
	 */
	year: number;
	/**
	 * Month
	 */
	month: number;
	/**
	 * Day
	 */
	day: number;
	/**
	 * Hour
	 */
	hour?: number;
	/**
	 * Minute
	 */
	minute?: number;
	/**
	 * Second
	 */
	second?: number;
	/**
	 * Type of calendars
	 */
	calendarType?: CalendarTypes;
	/**
	 * Timezones
	 */
	timeZone?: TimeZones;
};
function gregorianToJulian({
	year,
	month,
	day,
	hour,
	minute,
	second,
	timeZone,
	calendarType,
}: GregorianToJulianOptions): { jd: number; jdn: number } {
	// setting default values
	const h: number = hour ?? 12;
	const m: number = minute ?? 0;
	const s: number = second ?? 0;
	const ctt: CalendarTypes = calendarType ?? "Gregorian";
	const tzz: TimeZones = timeZone ?? "GMT";
	const tz: number = get_offset(tzz);
	// secular difference for calendar types
	const d: number = utils.secularDiff(year);
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
		ctt === "Julian" || (ctt === "British" && _jd < utils.SG) ? _jd + d : _jd;
	// make sure jdn with tz and calendar type
	const jdn: number = Math.round(jd);
	return {
		jd,
		jdn,
	};
}

export default gregorianToJulian;
