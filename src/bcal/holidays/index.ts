import { eid_day } from "../exceptions/eid.js";
import { substituteHoliday } from "../exceptions/holiday.js";
import { bmHolidays } from "./burma.js";
import { gregorianHolidays } from "./gholidays.js";
import { thingyanHolidays } from "./thingyan.js";
type HolidayParams = {
	/**
	 * Julian Day Number
	 */
	jdn: number;
	/**
	 * Gregorian Calendar Year
	 */
	year: number;
	/**
	 * Gregorian Calendar Month
	 */
	month: number;
	/**
	 * Gregorian Calendar Day
	 */
	day: number;
	/**
	 * Moon Phase
	 */
	mp: number;
	/**
	 * Burmese Year
	 */
	by: number;
	/**
	 * Burmese Month
	 */
	bm: number;
	/**
	 * Burmese day
	 */
	bd: number;
	/**
	 * Burmese Month Type
	 */
	bmt: number;
	/**
	 * String array to collect holidays
	 */
	hs: string[];
};
/**
 * **Get All Public HoliDays**
 * @param {HolidayParams}
 */
export function holidays({
	jdn,
	year,
	month,
	day,
	mp,
	bmt,
	by,
	bm,
	bd,
	hs,
}: HolidayParams): void {
	gregorianHolidays(year, month, day, hs);
	substituteHoliday(jdn, hs);
	thingyanHolidays(jdn, by, bmt, hs);
	bmHolidays(by, bm, bd, mp, hs);
	eid_day(jdn, hs);
}
