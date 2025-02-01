/*!
    Modern Myanmar Calendrical Calculations


	Original Author Information
	===========================
	
	Website: https://yan9a.github.io/mcal/

	License: MIT License (https://opensource.org/licenses/MIT)

	Copyright: © 2018 Yan Naing Aye

	Documentation: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

	File : https://github.com/yan9a/mmcal/blob/master/javascript/ceMmDateTime.js

	This is changing the code from JavaScript to TypeScript, still bound by the original MIT License and 
    copyright notice provided by Yan Naing Aye.

 */

import { type Astro, astroDays } from "./bcal/astro-days/index.js";
import { type JTB, j2b } from "./bcal/bcc/j2b.js";
import { holidays } from "./bcal/holidays/index.js";
import { langs } from "./bcal/langs.js";
import {
  MONTHS,
  MONTH_SHORT,
  WEEK_DAYS,
  WEEK_DAYS_SHORT,
} from "./bcal/list.js";
import gregorianToJulian, {
  type CalendarTypes,
} from "./gregorian-julian/index.js";
import type { TimeZones } from "./timezones/typetz.js";
import { type Language, utils } from "./utils/index.js";
// --

export type DateObject = {
  /**
   * Julian Day Number
   */
  jdn: number;
  /**
   * Gregorian Year
   */
  year: number | string;
  /**
   * Gregorian Month id
   */
  month_id: number;
  /**
   * Gregorian Month
   */
  month_long: string;
  /**
   * Gregorian Month Short , only for English
   */
  month_short: string;
  /**
   * Gregorian Date
   */
  date: number | string;
  /**
   * Week day id,not related to calculation just for place first day of the month on month-view UI
   *
   * [0=sun , ... , 6=sat]
   */
  weekday_id: number;
  /**
   * weekday long
   */
  weekday_long: string;
  /**
   * weekday short
   */
  weekday_short: string;
  /**
   * Holiday or not
   */
  isHoliday: boolean;
  /**
   * Full Moon Day or not
   */
  isFullMoon: boolean;
  /**
   * New Moon Day or not
   */
  isNewMoon: boolean;

  /**
   * burmese Calendar info
   */
  burmese_cal: {
    /**
     * Sasana Year BE
     */
    sasana_year: string | number;
    /**
     * burmese Year
     */
    burmese_year: string | number;
    /**
     * burmese Month String
     */
    burmese_month: string;
    /**
     * Moon Phase
     */
    moon_phase: string;
    /**
     * [1 - 15]
     */
    fortnight_date: string | number;
    /**
     * [1 - 30]
     */
    burmese_date: string | number;
    /**
     * Yatyaza or Pyathada -
     */
    yatyaza_pyathada: string | string[];
    /**
     * Sabbath or eve
     */
    sabbath: string;
    /**
     * Dragon Head Direction
     */
    nagahle: string;
    /**
     * Mahabote
     */
    mahabote: string;
    /**
     * Nakhat
     */
    nakhat: string;
    /**
     * Astrological days array
     */
    astro_days: string[];
    /**
     * Public Holidays array
     */
    public_holiday: string[];
  };
};
// ---
export type MonthObject = {
  /**
   * Gregorian year
   */
  year: number | string;
  /**
   * Gregorian month Id [1-12]
   */
  month_id: number;
  /**
   * Gregorian month
   */
  month_long: string;
  /**
   * Gregorian month Short , only for English
   */
  month_short: string;
  /**
   * Sasana Year array BE
   */
  sasana_years: string[] | number[];
  /**
   * Burmese Year(ME) array
   */
  burmese_years: string[] | number[];
  /**
   * Burmese Month Names Array
   */
  burmese_months: string[];
  /**
   * DateObjects array
   */
  date_views: Array<DateObject>;
};
// ---
export type YearObject = {
  /**
   * Year
   */
  year: number;
  /**
   * Sasana Year array
   */
  sasana_years: string[] | number[];
  /**
   * Burmese Year array
   */
  burmese_years: string[] | number[];
  /**
   * MonthObjects array
   */
  month_views: Array<MonthObject>;
};
// --
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
  date: number;
  /**
   * Language for output
   *
   * @default English
   */
  lang?: Language;
};
// ---
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
};
// ---
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
};
// -------------
class BurmeseCalendar {
  private _lang: Language = "English";
  private _tz: TimeZones = "Asia/Yangon";
  private _ct: CalendarTypes = "Gregorian";
  private _year: number = new Date().getFullYear();
  private _month = 0;
  private _date = 0;
  private cal() {
    // days of each month in this._langyear
    const month_array: number[] = utils.monthsDaysArray(this._year);
    // Sasana year and temp storage for that
    let _ssy: string | number = "";
    const ssy_str: string[] = [];
    const ssy_num: number[] = [];
    // Burmese year and temp storage for that
    let _by: string | number = "";
    const by_str: string[] = [];
    const by_num: number[] = [];
    // year object
    const year_object: YearObject = {
      year: this._year,
      sasana_years: [],
      burmese_years: [],
      month_views: [],
    };
    // ==========================
    //     Start of Months loop
    // ==========================
    for (let i = 0; i < 12; i++) {
      const days_in_month: number = month_array[i];
      const bm_str: string[] = [];
      const month_object: MonthObject = {
        year: this._year,
        month_id: i + 1,
        month_long: utils.Tstr(MONTHS[i], langs, this._lang) as string,
        month_short: MONTH_SHORT[i],
        sasana_years: [],
        burmese_years: [],
        burmese_months: [],
        date_views: [],
      };
      // ==========================
      //     Start of Days loop
      // ==========================
      for (let j = 1; j <= days_in_month; j++) {
        const _month = i + 1;
        // get jdn
        const jdn: number = gregorianToJulian({
          year: this._year,
          month: _month,
          day: j,
          timeZone: this._tz,
          calendarType: this._ct,
        }).jdn;
        // Burmese Calendar Info
        const bcal: JTB = j2b(jdn);
        const astro: Astro = astroDays({
          by: bcal.by,
          bm: bcal.bm,
          ml: bcal.bml,
          bd: bcal.bd,
          wd: bcal.wd,
        });
        // This `wdid` is not related to calculation just for month view component
        const wd_id = bcal.wd - 1;
        // [0=sun , ... , 6=sat] to place first day of month
        const wdid = wd_id === -1 ? 6 : wd_id;
        // temp storage for astro days
        const asd_array: string[] = [];
        // push astro days to temp storage
        astro.asd(asd_array);
        // temp storage for holidays
        const hld_array: string[] = [];
        // push holidays to temp storage
        holidays({
          jdn: jdn,
          year: this._year,
          month: _month,
          day: j,
          mp: bcal.mp,
          bmt: bcal.bmt,
          by: bcal.by,
          bm: bcal.bm,
          bd: bcal.bd,
          hs: hld_array,
        });
        bm_str.push(utils.Tstr(bcal.bm_str, langs, this._lang) as string);
        // _ssy
        _ssy = utils.Tnum(bcal.ssy, this._lang);
        if (typeof _ssy === "string") {
          ssy_str.push(_ssy);
        } else if (typeof _ssy === "number") {
          ssy_num.push(_ssy);
        }
        // _by
        _by = utils.Tnum(bcal.by, this._lang);
        if (typeof _by === "string") {
          by_str.push(_by);
        } else if (typeof _by === "number") {
          by_num.push(_by);
        }
        // holidays check
        const is_holiday: boolean = hld_array.length > 0;
        // Moon Phase check [0=waxing, 1=full moon, 2=waning, 3=new moon]
        const is_fullMoon: boolean = bcal.mp === 1;
        const is_newMoon: boolean = bcal.mp === 3;
        const date_object: DateObject = {
          jdn: jdn,
          year: utils.Tnum(this._year, this._lang),
          month_id: _month,
          month_long: utils.Tstr(MONTHS[i], langs, this._lang) as string,
          month_short: MONTH_SHORT[i],
          date: utils.Tnum(j, this._lang),
          weekday_id: wdid,
          weekday_long: utils.Tstr(
            WEEK_DAYS[bcal.wd],
            langs,
            this._lang
          ) as string,
          weekday_short: WEEK_DAYS_SHORT[bcal.wd],
          isHoliday: is_holiday,
          isFullMoon: is_fullMoon,
          isNewMoon: is_newMoon,
          burmese_cal: {
            sasana_year: utils.Tnum(bcal.ssy, this._lang),
            burmese_year: utils.Tnum(bcal.by, this._lang),
            burmese_month: utils.Tstr(bcal.bm_str, langs, this._lang) as string,
            moon_phase: utils.Tstr(bcal.mp_str, langs, this._lang) as string,
            fortnight_date: utils.Tnum(bcal.fd, this._lang),
            burmese_date: utils.Tnum(bcal.bd, this._lang),
            yatyaza_pyathada: utils.Tstr(astro.ypy, langs, this._lang),
            sabbath: utils.Tstr(astro.sbd, langs, this._lang) as string,
            nagahle: utils.Tstr(astro.ngl, langs, this._lang) as string,
            mahabote: utils.Tstr(astro.mhb, langs, this._lang) as string,
            nakhat: utils.Tstr(astro.nkt, langs, this._lang) as string,
            astro_days: utils.Tstr(asd_array, langs, this._lang) as string[],
            public_holiday: utils.Tstr(
              hld_array,
              langs,
              this._lang
            ) as string[],
          },
        };
        // push day object to month object end of days loop
        month_object.date_views.push(date_object);
        // == End of Days loop
      }
      // remove all duplicate values from string or number arrays of month object push by days loop
      const msa: string[] = utils.uniqString(bm_str);
      month_object.burmese_months = [...msa];
      // push ssy from temp storage
      month_object.sasana_years =
        typeof _ssy === "string"
          ? utils.uniqString(ssy_str)
          : utils.uniqNumber(ssy_num);
      // push burmese year from temp storage
      month_object.burmese_years =
        typeof _by === "string"
          ? utils.uniqString(by_str)
          : utils.uniqNumber(by_num);
      // push month object to year object
      year_object.month_views.push(month_object);
      // End of Months loop
    }
    // remove all duplicate values from string or number arrays of year object push by  days and months loops
    year_object.sasana_years =
      typeof _ssy === "string"
        ? utils.uniqString(ssy_str)
        : utils.uniqNumber(ssy_num);
    year_object.burmese_years =
      typeof _by === "string"
        ? utils.uniqString(by_str)
        : utils.uniqNumber(by_num);
    return year_object;
  }
  /**
   * Set year for this
   * @default new Date().getFullYear()
   */
  public setYear(year: number) {
    this._year = year;
  }
  /**
   * Get year of this
   */
  public get year(): number {
    return this._year;
  }
  /**
   * Set month for this
   * @default 0
   */
  public setMonth(month: number) {
    this._month = month;
  }
  /**
   * Get the current month.
   * @returns The current month as a number.
   */
  public get month(): number {
    return this._month;
  }
  /**
   * Set the date for this calendar instance.
   * @param date - The day of the month to set.
   */
  public setDate(date: number) {
    this._date = date;
  }
  /**
   * Get the current date.
   * @returns The current date as a number.
   */
  public get date(): number {
    return this._date;
  }
  /**
   * Set the language for the calendar display.
   *
   * This method updates the internal language setting of the calendar,
   * allowing the calendar to display information in the specified language.
   *
   * @param lang - The language to be set for the calendar output.
   */

  public setLang(lang: Language) {
    this._lang = lang;
  }
  /**
   * Get the current language.
   * @returns The current language as a string.
   */
  public get lang() {
    return this._lang;
  }
  /**
   * Set the timezone for this calendar instance.
   *
   * This method updates the internal timezone setting of the calendar,
   * allowing the calendar to compute dates and times in the specified timezone.
   *
   * @param tz - The timezone to be set for the calendar.
   */
  public setTimezone(tz: TimeZones) {
    this._tz = tz;
  }
  /**
   * Get the current timezone.
   * @returns The current timezone as a string.
   */
  public get timezone() {
    return this._tz;
  }
  /**
   * Set the calendar type for this calendar instance.
   *
   * This method updates the internal calendar type setting of the calendar,
   * allowing the calendar to compute dates and times in the specified calendar
   * type.
   *
   * @param ct - The calendar type to be set for the calendar.
   */
  public setCalendarType(ct: CalendarTypes) {
    this._ct = ct;
  }
  /**
   * Get the current calendar type.
   * @returns The current calendar type as a string.
   */
  public get calendarType() {
    return this._ct;
  }
  /**
   * Return the result of the calendar view.
   *
   * The result of the calendar view depends on the current mode of the calendar.
   * If the calendar is in month view mode, it will return the month object.
   * If the calendar is in date view mode, it will return the date object.
   * If the calendar is not in either month view or date view mode, it will return
   * the year object.
   *
   * @returns The result of the calendar view.
   */
  public res(): MonthObject | YearObject | DateObject {
    if (this._month !== 0 && this._date === 0) {
      return this.cal().month_views[this._month - 1];
    } else if (this._month !== 0 && this._date !== 0) {
      return this.cal().month_views[this._month - 1].date_views[this._date - 1];
    } else {
      return this.cal();
    }
  }
  /**
   * Convert the current calendar view to a JSON string.
   *
   * Depending on the current mode of the calendar, this method
   * serializes the month view, date view, or year view to a JSON
   * string with indentation for readability.
   *
   * @returns The JSON string representation of the current calendar view.
   */
  public json(): string {
    if (this._month !== 0 && this._date === 0) {
      return JSON.stringify(this.cal().month_views[this._month - 1], null, 2);
    } else if (this._month !== 0 && this._date !== 0) {
      return JSON.stringify(
        this.cal().month_views[this._month - 1].date_views[this._date - 1],
        null,
        2
      );
    } else {
      return JSON.stringify(this.cal(), null, 2);
    }
  }
  /**
   * Update the calendar to a specific date and return the detailed date view.
   *
   * This method sets the internal state of the calendar to the specified year,
   * month, and date, using the provided or default language. It then computes
   * and returns the detailed information for that specific date in the Burmese
   * calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param month - The month to be set in the calendar.
   * @param date - The day of the month to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @returns The date object containing detailed information for the specified date.
   */
  public dateView({ year, month, date, lang = "English" }: DateViewOptions) {
    this._year = year;
    this._month = month;
    this._date = date;
    this._lang = lang;
    return this.cal();
  }
  /**
   * Update the calendar to a specific month and return the detailed month view.
   *
   * This method sets the internal state of the calendar to the specified year
   * and month, using the provided or default language. It then computes and
   * returns the detailed information for that month in the Burmese calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param month - The month to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @returns The month object containing detailed information for the specified month.
   */
  public monthView({ year, month, lang = "English" }: MontnViewOptions) {
    this._year = year;
    this._month = month;
    this._lang = lang;
    this._date = 0;
    return this.cal();
  }
  /**
   * Update the calendar to a specific year and return the detailed year view.
   *
   * This method sets the internal state of the calendar to the specified year,
   * using the provided or default language. It then computes and returns the
   * detailed information for that year in the Burmese calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @returns The year object containing detailed information for the specified year.
   */
  public yearView({ year, lang = "English" }: YearViewOptions) {
    this._year = year;
    this._month = 0;
    this._lang = lang;
    this._date = 0;
    return this.cal();
  }
}

export type { TimeZones, Language, CalendarTypes };
export default BurmeseCalendar;
