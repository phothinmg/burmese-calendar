import type { TimeZones } from "../timezones/tztype.js";

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

export type CalendarTypes = "British" | "Gregorian" | "Julian";
