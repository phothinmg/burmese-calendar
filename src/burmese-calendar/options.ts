import type { CalendarTypes } from "../gregorian-julian/types";
import type { Language } from "./translate.js";
import type { TimeZones } from "../timezones/tztype.js";
// ----------------------------------------------------
export type DateViewOptions = {
	/**
	 * Gregorian year
	 */
	year: number;
	/**
	 * Gregorian month
	 */
	month: number;
	/**
	 * Gregorian day
	 */
	day: number;
	/**
	 * Language for output
	 *
	 * @default English
	 */
	lang?: Language;
	/**
	 * Timezone
	 * @default "Asia/Yangon"
	 */
	tz?: TimeZones;
	/**
	 * Calendar Type
	 * @default Gregorian
	 */
	ct?: CalendarTypes;
};
//-----
export type MontnViewOptions = {
	/**
	 * Gregorian year
	 */
	year: number;
	/**
	 * Gregorian month
	 */
	month: number;

	/**
	 * Language for output
	 *
	 * @default English
	 */
	lang?: Language;
	/**
	 * Timezone
	 * @default "Asia/Yangon"
	 */
	tz?: TimeZones;
	/**
	 * Calendar Type
	 * @default Gregorian
	 */
	ct?: CalendarTypes;
};
// --------
export type YearViewOptions = {
	/**
	 * Gregorian year
	 */
	year: number;
	/**
	 * Language for output
	 *
	 * @default English
	 */
	lang?: Language;
	/**
	 * Timezone
	 * @default "Asia/Yangon"
	 */
	tz?: TimeZones;
	/**
	 * Calendar Type
	 * @default Gregorian
	 */
	ct?: CalendarTypes;
};
