/*!
    Modern Myanmar Calendrical Calculations


	Original Author Information
	===========================
	
	Website: https://yan9a.github.io/mcal/

	License: MIT License (https://opensource.org/licenses/MIT)

	Copyright: © 2018 Yan Naing Aye

	Documentation: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

	File : https://github.com/yan9a/mmcal/blob/master/javascript/ceMmDateTime.js

	Still bound by the original MIT License and copyright notice provided by Yan Naing Aye.

 */
var BurmeseCalendar = class {
  _lang = "English";
  _tz = "Asia/Yangon";
  _ct = "Gregorian";
  _year = /* @__PURE__ */ new Date().getFullYear();
  _month = 0;
  _date = 0;
  cal() {
    const month_array = utils.monthsDaysArray(this._year);
    let _ssy = "";
    const ssy_str = [];
    const ssy_num = [];
    let _by = "";
    const by_str = [];
    const by_num = [];
    const year_object = {
      year: this._year,
      sasana_years: [],
      burmese_years: [],
      month_views: [],
    };
    for (let i = 0; i < 12; i++) {
      const days_in_month = month_array[i];
      const bm_str = [];
      const month_object = {
        year: this._year,
        month_id: i + 1,
        month_long: utils.Tstr(MONTHS[i], langs, this._lang),
        month_short: MONTH_SHORT[i],
        sasana_years: [],
        burmese_years: [],
        burmese_months: [],
        date_views: [],
      };
      for (let j = 1; j <= days_in_month; j++) {
        const _month = i + 1;
        const jdn = gregorian_julian_default({
          year: this._year,
          month: _month,
          day: j,
          timeZone: this._tz,
          calendarType: this._ct,
        }).jdn;
        const bcal = j2b(jdn);
        const astro2 = astroDays({
          by: bcal.by,
          bm: bcal.bm,
          ml: bcal.bml,
          bd: bcal.bd,
          wd: bcal.wd,
        });
        const wd_id = bcal.wd - 1;
        const wdid = wd_id === -1 ? 6 : wd_id;
        const asd_array = [];
        astro2.asd(asd_array);
        const hld_array = [];
        holidays({
          jdn,
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
        bm_str.push(utils.Tstr(bcal.bm_str, langs, this._lang));
        _ssy = utils.Tnum(bcal.ssy, this._lang);
        if (typeof _ssy === "string") {
          ssy_str.push(_ssy);
        } else if (typeof _ssy === "number") {
          ssy_num.push(_ssy);
        }
        _by = utils.Tnum(bcal.by, this._lang);
        if (typeof _by === "string") {
          by_str.push(_by);
        } else if (typeof _by === "number") {
          by_num.push(_by);
        }
        const is_holiday = hld_array.length > 0;
        const is_fullMoon = bcal.mp === 1;
        const is_newMoon = bcal.mp === 3;
        const date_object = {
          jdn,
          year: utils.Tnum(this._year, this._lang),
          month_id: _month,
          month_long: utils.Tstr(MONTHS[i], langs, this._lang),
          month_short: MONTH_SHORT[i],
          date: utils.Tnum(j, this._lang),
          weekday_id: wdid,
          weekday_long: utils.Tstr(WEEK_DAYS[bcal.wd], langs, this._lang),
          weekday_short: WEEK_DAYS_SHORT[bcal.wd],
          isHoliday: is_holiday,
          isFullMoon: is_fullMoon,
          isNewMoon: is_newMoon,
          burmese_cal: {
            sasana_year: utils.Tnum(bcal.ssy, this._lang),
            burmese_year: utils.Tnum(bcal.by, this._lang),
            burmese_month: utils.Tstr(bcal.bm_str, langs, this._lang),
            moon_phase: utils.Tstr(bcal.mp_str, langs, this._lang),
            fortnight_date: utils.Tnum(bcal.fd, this._lang),
            burmese_date: utils.Tnum(bcal.bd, this._lang),
            yatyaza_pyathada: utils.Tstr(astro2.ypy, langs, this._lang),
            sabbath: utils.Tstr(astro2.sbd, langs, this._lang),
            nagahle: utils.Tstr(astro2.ngl, langs, this._lang),
            mahabote: utils.Tstr(astro2.mhb, langs, this._lang),
            nakhat: utils.Tstr(astro2.nkt, langs, this._lang),
            astro_days: utils.Tstr(asd_array, langs, this._lang),
            public_holiday: utils.Tstr(hld_array, langs, this._lang),
          },
        };
        month_object.date_views.push(date_object);
      }
      const msa = utils.uniqString(bm_str);
      month_object.burmese_months = [...msa];
      month_object.sasana_years =
        typeof _ssy === "string"
          ? utils.uniqString(ssy_str)
          : utils.uniqNumber(ssy_num);
      month_object.burmese_years =
        typeof _by === "string"
          ? utils.uniqString(by_str)
          : utils.uniqNumber(by_num);
      year_object.month_views.push(month_object);
    }
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
  setYear(year) {
    this._year = year;
  }
  /**
   * Get year of this
   */
  get year() {
    return this._year;
  }
  /**
   * Set month for this
   * @default 0
   */
  setMonth(month) {
    this._month = month;
  }
  /**
   * Get the current month.
   * @returns The current month as a number.
   */
  get month() {
    return this._month;
  }
  /**
   * Set the date for this calendar instance.
   * @param date - The day of the month to set.
   */
  setDate(date) {
    this._date = date;
  }
  /**
   * Get the current date.
   * @returns The current date as a number.
   */
  get date() {
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
  setLang(lang) {
    this._lang = lang;
  }
  /**
   * Get the current language.
   * @returns The current language as a string.
   */
  get lang() {
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
  setTimezone(tz) {
    this._tz = tz;
  }
  /**
   * Get the current timezone.
   * @returns The current timezone as a string.
   */
  get timezone() {
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
  setCalendarType(ct) {
    this._ct = ct;
  }
  /**
   * Get the current calendar type.
   * @returns The current calendar type as a string.
   */
  get calendarType() {
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
  res() {
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
  json() {
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
  dateView({ year, month, date, lang = "English" }) {
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
  monthView({ year, month, lang = "English" }) {
    if (month < 1) throw new Error();
    this._year = year;
    this._month = month;
    this._lang = lang;
    this._date = 0;
    return this.cal().month_views[month - 1];
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
  yearView({ year, lang = "English" }) {
    this._year = year;
    this._month = 0;
    this._lang = lang;
    this._date = 0;
    return this.cal();
  }
};
