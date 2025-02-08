import { type CalendarTypes } from "./g2j.js";
import type { TimeZones } from "./tztype.js";
import { type Language } from "./translate.js";
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
   * @default GMT
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
   * @default GMT
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
   * @default GMT
   */
  tz?: TimeZones;
  /**
   * Calendar Type
   * @default Gregorian
   */
  ct?: CalendarTypes;
};
