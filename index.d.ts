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
  /**
   * Calendar Types
   */
  enum Ct {
    gregorian,
    julian,
  }

  type BcalInfo = {
    /**
     * Sasana Year [BE]
     */
    sasana_year: number;
    /**
     * Sasana Year [BE]
     * If translate to Burmese.
     */
    sasana_year_str: string;
    /**
     * Burmese Year [ME]
     */
    burmese_year: number;
    /**
     * Burmese Year [ME]
     * If translate to Burmese.
     */
    burmese_year_str: string;
    /**
     * Burmese month index
     * [
     *  Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
     *  Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
     *  Tabaung=12, Late Tagu=13, Late Kason=14
     * ]
     */
    burmese_month_index: number;
    /**
     * Burmese month
     */
    burmese_month_str: string;
    /**
     * Moon Phases index
     * [0=waxing, 1=full moon, 2=waning, 3=new moon]
     */
    moon_phases_index: number;
    /**
     * Moon Phase String
     */
    moon_phases_str: string;
    /**
     * Fortnight Day [1-15]
     */
    fortnight_day: number;
    /**
     * Fortnight Day String
     */
    fortnight_day_str: string;
    /**
     * Burmese Day [1-30]
     */
    burmese_day: number;
    /**
     * Burmese Day String
     */
    burmese_day_str: string;
    /**
     * Mahabote
     */
    mahabote: string;
    /**
     * Heading of Dragon
     */
    nagahle: string;
    nakhat: string;
    /**
     * For Buddhist Lent,sabbath days are school holiday else false.
     */
    is_sabbath_schoolHoliday: boolean;
    sabbath: string;
    yatyaza: string;
    pyathada: string;
    public_holiday: string[];
  };

  type DayView = {
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
    date_views: DayView[];
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
   * @param {number} year The year of the date.
   * @param {number} month The month of the date [1-12].
   * @param {number} day  The day of the month [1-31].
   * @param {number} [hour=12] Hour default 12
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

  /**
   * @description
   * Retrieve a DateView object containing detailed information about a specific date.
   * @param {number} year - The year of the date.
   * @param {number} month - The month of the date (1-12).
   * @param {number} day - The day of the month.
   * @param {Languages} [lang] - Optional language parameter to specify the language of the date information.
   * @returns {DayView} An object containing the Gregorian and Burmese calendar details for the specified date.
   */
  function dayView(
    year: number,
    month: number,
    day: number,
    lang?: Languages
  ): DayView;

  /**
   * @description
   * Retrieve a MonthView object containing detailed information about a specific date.
   * @param {number} year - The year of the date.
   * @param {number} month - The month of the date (1-12).
   * @param {Languages} [lang] - Optional language parameter to specify the language of the date information.
   * @returns {MonthView} An object containing the Gregorian and Burmese calendar details for the specified date.
   */
  function monthView(year: number, month: number, lang?: Languages): MonthView;
  /**
   * @description
   * Retrieve a YearView object containing detailed information about a specific date.
   * @param {number} [year] - The year of the date.Optional default - current year.
   * @param {Languages} [lang] - Optional language parameter to specify the language of the date information.
   * @returns {YearView} An object containing the Gregorian and Burmese calendar details for the specified date.
   */
  function yearView(year?: number, lang?: Languages): YearView;
}
