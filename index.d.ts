export = Bcal;
export as namespace bcal;

declare namespace Bcal {
  /**
   * Languages
   */
  enum Languages {
    English,
    Burmnese,
  }

  enum Ct {
    gregorian,
    julian,
  }

  type BcalInfo = {
    sasana_year: number;
    sasana_year_str: string;
    burmese_year: number;
    burmese_year_str: string;
    burmese_month_index: number;
    burmese_month_str: string;
    moon_phases_index: number;
    moon_phases_str: string;
    fortnight_day: number;
    fortnight_day_str: string;
    burmese_day: number;
    burmese_day_str: string;
    mahabote: string;
    nagahle: string;
    nakhat: string;
    is_sabbath_schoolHoliday: boolean;
    sabbath: string;
    yatyaza: string;
    pyathada: string;
    public_holiday: string[];
  };

  type DateView = {
    jdn: number;
    year: number;
    year_str: string;
    month: number;
    month_str_long: string;
    month_str_short: string;
    day: number;
    day_str: string;
    wd_str_long: string;
    wd_str_short: string;
    bcal_info: BcalInfo;
  };

  type MonthView = {
    year: number;
    year_str: string;
    month: number;
    month_str_long: string;
    month_str_short: string;
    days_in_month: number;
    sasana_years: number[];
    sasana_years_str: string[];
    burmese_years: number[];
    burmese_years_str: string[];
    burmese_months: number[];
    burmese_months_str: string[];
    date_views: DateView[];
  };

  type YearView = {
    year: number;
    year_str: string;
    sasana_years: number[];
    sasana_years_str: string[];
    burmese_years: number[];
    burmese_years_str: string[];
    month_views: MonthView[];
  };

  /**
   * @description
   * Convert Gregorian Date and Time to Julian Date and Julian Day Number.
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @param {number} [hour=12]
   * @param {number} [minute=0]
   * @param {number} [seconds=0]
   * @param {number} [tz_offset=0.0]
   * @returns {{ jd: number, jdn: number }}
   */
  function datetimeToJd(
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    seconds?: number,
    /**
     * Timezone Offset
     * @example
     * "+8:00" -> 8.0
     * "+6:30" -> 6.5
     * @default
     * 0.0
     */
    tz_offset?: number
  ): { jd: number; jdn: number };

  /**
   * @description
   * Convert Julian Date to Gregorian Date and Time
   * @param {number} jd  Juluian Date
   * @param {number} [tz_offset=0.0]
   * @returns {{
   *   year: number,
   *   month: number,
   *   day: number,
   *   hour: number,
   *   minute: number,
   *   seconds: number,
   * }}
   */
  function jdToDatetime(
    /**
     * Juluian Date
     */
    jd: number,
    /**
     * Timezone Offset
     * @example
     * "+8:00" -> 8.0
     * "+6:30" -> 6.5
     * @default
     * 0.0
     */
    tz_offset?: number
  ): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    seconds: number;
  };

  /**
   * @description
   * Convert Gregorian Calendar Date and Julian Calendar Date each other.
   * @param {Ct} ct // Calendar type want to convert
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @returns {{
   *   year: number,
   *   month: number,
   *   day: number,
   * }}
   */
  function calConverter(
    ct: Ct,
    year: number,
    month: number,
    day: number
  ): { year: number; month: number; day: number };
}
