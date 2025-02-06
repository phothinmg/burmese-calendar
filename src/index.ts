import type { TimeZones } from "./tztype.js";
// Types
interface AstroOpts {
  /**
   * Burmese Year
   */
  by: number;
  /**
   * Burmese Month
   */
  bm: number;
  /**
   * Burmese Day [1-30]
   */
  bd: number;
  /**
   * Weekdaty ID [0-6] [0=Sat,...,6=Fri]
   */
  wd: number;
  /**
   * Length of Burmese Month
   */
  lm: number;
}
interface HolidaysOpts {
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
}
type GetWoNm = {
  /**
   * warhtat offset to compensate
   */
  WO: number;
  /**
   * Number of months to find excess days
   */
  NM: number;
};
type GetLeapYearData = {
  /**
   * Myanmar Year Type
   *
   * 0=common, 1=little warhtat, 2=big warhtat
   *
   */
  myt: number;
  /**
   * The 1st day of Tagu as Julian Day Number for MMT
   */
  tg1: number;
  /**
   * Full moon day of [2nd] Warso as Julian Day Number
   */
  fm: number;
  /**
   * Warhtat discrepancy
   *
   * 0 = ok, 1= error
   */
  err: number;
};
type EraIds = 1.1 | 1.2 | 1.3 | 2 | 3;
type JTB = {
  /**
   * Burmese Year Types
   * 0=common, 1=little warhtat, 2=big warhtat
   */
  yt: number;
  /**
   * Sasana Year
   */
  ssy: number;
  /**
   * Burmese Year
   */
  by: number;
  /**
   * Burmese Month
   */
  bm: number;
  /**
   * Burmese Month String
   */
  bm_str: string;
  /**
   * Burmese Month Type
   */
  bmt: number;
  /**
   * Burmese Month Length
   */
  bml: number;
  /**
   * Burmese Day
   */
  bd: number;
  /**
   * Fortnight Day
   */
  fd: number;
  /**
   * Week Day
   */
  wd: number;
  /**
   * Moon Phase
   * [0=waxing, 1=full moon, 2=waning, 3=new moon]
   */
  mp: number;
  /**
   * Moon Phase String
   */
  mp_str: string;
};
type GregorianToJulianOptions = {
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

export type Language = "English" | "Burmese";
export type CalendarTypes = "British" | "Gregorian" | "Julian";
export type DateViewObject = {
  /**
   * Julian Day Number
   */
  jdn: number;
  /**
   * Gregorian Year
   */
  year: {
    /**
     * Gregorian Year in Number
     */
    id: number;
    /**
     * Gregorian Year in string
     */
    str: string | number;
  };
  /**
   * Gregorian Month
   */
  month: {
    /**
     * 1 - 12 [1=Jan,...,12=Dec]
     */
    id: number;
    /**
     * Name of Gregorian Month eg.January
     */
    long: string;
    /**
     * Name of Gregorian Month eg.Jan
     */
    short: string;
  };
  /**
   * Gregorian Day
   */
  day: {
    /**
     * Gregorian Day in Number
     */
    id: number;
    /**
     * Gregorian Day in string
     */
    str: string | number;
  };
  /**
   * Weekday
   */
  weekday: {
    /**
     * Week day id,not related to calculation just for place first day of the month on month-view UI
     *
     * [0=sun , ... , 6=sat]
     */
    id: number;
    /**
     * weekday long
     */
    long: string;
    /**
     * weekday short
     */
    short: string;
  };
  /**
   * Public Holidays Or Not
   */
  isHoliday: boolean;
  /**
   * Burmese Calendar info
   */
  burmese_cal: {
    /**
     * Sasana Year BE
     */
    sasana_year: {
      id: number;
      str: number | string;
    };
    /**
     * Burmese Year
     */
    burmese_year: {
      id: number;
      str: number | string;
    };
    /**
     * Burmese Month
     */
    burmese_month: {
      index: number;
      str: string;
    };
    /**
     * Moon Phase
     */
    moon_phase: {
      index: number;
      str: string;
    };
    /**
     * Fortnight Day
     */
    fortnight_day: {
      /**
       *  [1 - 15] Or [1 - 14]
       */
      id: number;
      str: string | number;
    };
    /**
     * Burmese Day of a Burmese Month
     */
    burmese_day: {
      /**
       *  [1 - 30] Or [1 - 31]
       */
      id: number;
      str: string | number;
    };
    /**
     * Yatyaza
     */
    yatyaza: {
      /**
       * [0="",1="Yatyaza"]
       */
      index: number;
      str: string;
    };
    /**
     * Pyathada
     */
    pyathada: {
      /**
       * [0="",1="Pyathada",2="Afternoon Pyathada"]
       */
      index: number;
      str: string;
    };
    /**
     * Sabbath
     */
    sabbath: {
      /**
       * [0="",1="Sabbath",2="Sabbath Eve"]
       */
      index: number;
      str: string;
    };
    /**
     * Dragon Head Direction
     */
    nagahle: {
      /**
       * [0="West",1="North",2="East",3="South"]
       */
      index: number;
      str: string;
    };
    /**
     * Mahabote
     */
    mahabote: {
      /**
       * [0="Binga",1= "Ahtun",2="Yaza",3="Adipati",4="Marana",5="Thike",6="Puti"]
       */
      index: number;
      str: string;
    };
    /**
     * Nakhat
     */
    nakhat: {
      /**
       * [0="Ogre",1="Elf",2="Human"]
       */
      index: number;
      str: string;
    };
    /**
     * Array of Astrological days
     */
    astro_days: string[];
    /**
     * Array of Public Holidays
     */
    public_holiday: string[];
  };
};
export type MonthViewObject = {
  /**
   * Gregorian Year
   */
  year: {
    /**
     * Gregorian Year in Number
     */
    id: number;
    /**
     * Gregorian Year in string
     */
    str: string | number;
  };
  /**
   * Gregorian Month
   */
  month: {
    /**
     * 1 - 12 [1=Jan,...,12=Dec]
     */
    id: number;
    /**
     * Name of Gregorian Month eg.January
     */
    long: string;
    /**
     * Name of Gregorian Month eg.Jan
     */
    short: string;
  };
  /**
   * Sasana Year[BE]
   */
  sasana_years: {
    ids: number[];
    str: string[] | number[];
  };
  /**
   * Burmese Year[ME]
   */
  burmese_years: {
    ids: number[];
    str: string[] | number[];
  };
  /**
   * Burmese Month
   */
  burmese_months: {
    index: number[];
    str: string[];
  };
  /**
   * DateViewObjects array
   */
  date_views: Array<DateViewObject>;
};
export type YearViewObject = {
  /**
   * Gregorian Year
   */
  year: {
    /**
     * Gregorian Year in Number
     */
    id: number;
    /**
     * Gregorian Year in string
     */
    str: string | number;
  };
  /**
   * Sasana Year[BE]
   */
  sasana_years: {
    ids: number[];
    str: string[] | number[];
  };
  /**
   * Burmese Year[ME]
   */
  burmese_years: {
    ids: number[];
    str: string[] | number[];
  };
  /**
   * MonthViewObjects array
   */
  month_views: Array<MonthViewObject>;
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
// ---------------------------------------------------------------------------------

// Helpers Functions
/**
 * Returns the secular difference between the Julian period and the Gregorian
 * period, given a year.
 * @param year The year for which to calculate the secular difference.
 * @returns The secular difference between the Julian period and the Gregorian
 * period, for the given year.
 */
function secularDiff(year: number): number {
  return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}
/**
 * Determine if a given year is a leap year.
 * @param year The year to determine if it is a leap year.
 * @returns True if the year is a leap year, False otherwise.
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * Get the number of days in each month of a year, given the year.
 * @param year The year for which to get the number of days in each month.
 * @returns An array of length 12, where each element is the number of days in the corresponding month.
 */
function monthsDaysArray(year: number): number[] {
  const ms: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const ml: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return isLeapYear(year) ? ml : ms;
}
/**
 * Removes duplicate numbers from an array.
 * @param obj An array of numbers.
 * @returns A new array containing only unique numbers from the input array.
 */
function uniqNumber(obj: number[]): number[] {
  return Array.from(new Set(obj));
}
/**
 * Removes duplicate strings from an array.
 * @param obj An array of strings.
 * @returns A new array containing only unique strings from the input array.
 */
function uniqString(obj: string[]): string[] {
  return Array.from(new Set(obj));
}
/**
 * Calculates the offset of the given time zone from the local time zone.
 * @param timeZone The time zone to calculate the offset for.
 * @returns The offset in hours between the given time zone and the local time zone.
 */
function get_offset(timeZone: TimeZones) {
  const now = new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = diff + now.getTimezoneOffset() / 60;

  return -offset;
}
// Gregorian to Julian
export function dateTime2Julian({
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
  const tz: number = get_offset(tzz);
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
// Exceptions
const substituteHolidays: number[] = [
  // 2019
  2458768, 2458772, 2458785, 2458800,
  // 2020
  2458855, 2458918, 2458950, 2459051, 2459062, 2459152, 2459156, 2459167,
  2459181, 2459184,
  // 2021
  2459300, 2459303, 2459323, 2459324, 2459335, 2459548, 2459573,
];

const eidDays: number[] = [
  //2020
  2459063,
];
// ဒုတိယဝါဆိုလပြည့်နေ့ ပြက္ခဒိန်အကြံပေးအဖွဲ့နှင့်ကွဲလွဲခဲ့သည့်ဇယား နှစ်စဥ် စစ်ဆေးပြီးဖြည့်သွင်းရမည်
// number arry[0] သည် မြန်မာနှစ်ဖြစ်သည်။ 1 သည် ကွဲလွဲသည့်နှစ် အရေအတွက် ဖြစ်သည်။

/**
 * ဒုတိယဝါဆိုလပြည့်နေ့ ပြက္ခဒိန်အကြံပေးအဖွဲ့နှင့်ကွဲလွဲခဲ့သည့်ဇယား နှစ်စဥ် စစ်ဆေးပြီးဖြည့်သွင်းရမည်
 *
 * The second full moon of Waso, which was in conflict with the calendar advisory group, must be checked and filled in every year.
 */
const FME: number[][] = [
  [1377, 1],
  //
  [1234, 1],
  [1261, -1],
  [1120, 1],
  [1126, -1],
  [1150, 1],
  [1172, -1],
  [1207, 1],
  [813, -1],
  [849, -1],
  [851, -1],
  [854, -1],
  [927, -1],
  [933, -1],
  [936, -1],
  [938, -1],
  [949, -1],
  [952, -1],
  [963, -1],
  [968, -1],
  [1039, -1],
  [205, 1],
  [246, 1],
  [471, 1],
  [572, -1],
  [651, 1],
  [653, 2],
  [656, 1],
  [672, 1],
  [729, 1],
  [767, -1],
];
/**
 * Warhtat Exceptions
 */
const WTE: { one: number[]; zero: number[] } = {
  one: [1201, 1263, 1344],
  zero: [1202, 1264, 1345],
};
// ----
class BcAstro {
  public astroDays: string[];
  public sabbath: { index: number; str: string };
  public nagahle: { index: number; str: string };
  public mahabote: { index: number; str: string };
  public natkhat: { index: number; str: string };
  public yatyaza: { index: number; str: string };
  public pyathada: { index: number; str: string };
  private _bm: number;
  private _bd: number;
  private _wd: number;
  constructor({ by, bm, bd, wd, lm }: AstroOpts) {
    this._bm = bm;
    this._bd = bd;
    this._wd = wd;
    this.sabbath = this._sabbath(this._bd, lm);
    this.nagahle = this._nagahle(this._bm);
    this.mahabote = this._mahabote(by, this._wd);
    this.natkhat = this._natkhat(by);
    this.yatyaza = this._yatyaza(this._bm, this._wd);
    this.astroDays = this.astros();
    this.pyathada = this._pyathada(this._bm, this._wd);
  }
  /**
   * Calculate Thamanyo
   * @param bm Burmese month
   * @param wd weekday id
   */
  private thamanyo(bm: number, wd: number): number {
    const bmt: number = Math.floor(bm / 13);
    let bm1: number = (bm % 13) + bmt; // to 1-12 with month type
    if (bm1 <= 0) bm1 = 4; //first warso is considered warso (looks no need here)

    const m1: number = bm1 - 1 - Math.floor(bm1 / 9);
    const wd1: number = (m1 * 2 - Math.floor(m1 / 8)) % 7;
    const wd2: number = (wd + 7 - wd1) % 7;

    const thamanyo: number = wd2 <= 1 ? 1 : 0;

    return thamanyo;
  }
  /**
   * Calculate Thamaphyu
   * @param bd Burmese date [1-30]
   * @param wd weekday id
   */
  private thamaphyu(bd: number, wd: number): number {
    const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
    let thamaphyu = 0;
    const wda = [1, 2, 6, 6, 5, 6, 7];
    const wdb = [0, 1, 0, 0, 0, 3, 3];

    if (mf === wda[wd] || mf === wdb[wd] || (mf === 4 && wd === 5)) {
      thamaphyu = 1;
    }

    return thamaphyu;
  }
  private amyeittasote(bd: number, wd: number): number {
    const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
    const wda: number[] = [5, 8, 3, 7, 2, 4, 1];
    return mf === wda[wd] ? 1 : 0;
  }
  private warameittugyi(bd: number, wd: number): number {
    const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
    const wda: number[] = [7, 1, 4, 8, 9, 6, 3];
    return mf === wda[wd] ? 1 : 0;
  }
  private warameittunge(bd: number, wd: number): number {
    const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
    const wn: number = (wd + 6) % 7;
    return 12 - mf === wn ? 1 : 0;
  }
  private yatpote(bd: number, wd: number): number {
    const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
    const wda: number[] = [8, 1, 4, 6, 9, 8, 7];
    return mf === wda[wd] ? 1 : 0;
  }
  private nagapor(bd: number, wd: number): number {
    const wda = [26, 21, 2, 10, 18, 2, 21];
    const wdb = [17, 19, 1, 0, 9, 0, 0];

    if (
      bd === wda[wd] ||
      bd === wdb[wd] ||
      (bd === 2 && wd === 1) ||
      ((bd === 12 || bd === 4 || bd === 18) && wd === 2)
    ) {
      return 1;
    }

    return 0;
  }
  private yatyotema(bm: number, bd: number): number {
    let bm1 = bm % 13 || 13; // Normalize month to 1-12
    if (bm1 <= 0) bm1 = 4; // Consider first warso as warso
    const mf: number = bd - 15 * Math.floor(bd / 16); // Get fortnight day [0-15]
    const m1 = bm1 % 2 ? bm1 : (bm1 + 9) % 12;
    const adjustedM1 = ((m1 + 4) % 12) + 1;
    const yatyotema = mf === adjustedM1 ? 1 : 0;
    return yatyotema;
  }
  private mahayatkyan(bm: number, bd: number): number {
    let bm1: number = bm;
    if (bm1 <= 0) bm1 = 4; // Adjust month if less than or equal to 0
    const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
    let mahayatkyan = 0;
    const m1 = ((Math.floor((bm1 % 12) / 2) + 4) % 6) + 1;
    if (mf === m1) mahayatkyan = 1;
    return mahayatkyan;
  }
  private shanyat(bm: number, bd: number): number {
    const bmt = Math.floor(bm / 13);
    let bm1 = (bm % 13) + bmt; // Adjust month to 1-12 range
    if (bm1 <= 0) bm1 = 4; // Consider first warso as warso
    const mf: number = bd - 15 * Math.floor(bd / 16); // Get day within a fortnight [0-15]
    const sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
    const shanyat = mf === sya[bm1 - 1] ? 1 : 0;
    return shanyat;
  }
  // -------------------
  private _sabbath(bd: number, lm: number): { index: number; str: string } {
    const a: string[] = ["", "Sabbath", "Sabbath Eve"];
    let s = 0;
    if (bd === 8 || bd === 15 || bd === 23 || bd === lm) s = 1;
    if (bd === 7 || bd === 14 || bd === 22 || bd === lm - 1) s = 2;
    return { index: s, str: a[s] };
  }
  private _nagahle(bm: number): { index: number; str: string } {
    const a: string[] = ["West", "North", "East", "South"];
    let m1: number = bm;
    if (bm <= 0) m1 = 4; //first warso is considered warso
    const b: number = Math.floor((m1 % 12) / 3);
    return { index: b, str: a[b] };
  }
  private _mahabote(by: number, wd: number): { index: number; str: string } {
    const a: string[] = [
      "Binga",
      "Ahtun",
      "Yaza",
      "Adipati",
      "Marana",
      "Thike",
      "Puti",
    ];
    const b: number = (by - wd) % 7;
    return { index: b, str: a[b] };
  }
  private _natkhat(by: number): { index: number; str: string } {
    const a: string[] = ["Ogre", "Elf", "Human"];
    const b: number = by % 3;
    return { index: b, str: a[b] };
  }
  private _yatyaza(bm: number, wd: number): { index: number; str: string } {
    const a: string[] = ["", "Yatyaza"];
    const m1: number = bm % 4;
    let y = 0;
    const wd1: number = Math.floor(m1 / 2) + 4;
    const wd2: number =
      (1 - Math.floor(m1 / 2) + (m1 % 2)) * (1 + 2 * (m1 % 2));
    if (wd === wd1 || wd === wd2) y = 1;
    return { index: y, str: a[y] };
  }
  private _pyathada(bm: number, wd: number): { index: number; str: string } {
    const a: string[] = ["", "Pyathada", "Afternoon Pyathada"];
    const m1: number = bm % 4;
    let p = 0;
    const wda: number[] = [1, 3, 3, 0, 2, 1, 2];
    if (m1 === 0 && wd === 4) p = 2; //afternoon pyathada
    if (m1 === wda[wd]) p = 1;
    return { index: p, str: a[p] };
  }
  private astros() {
    const hs: string[] = [];
    if (this.thamanyo(this._bm, this._wd)) {
      hs.push("Thamanyo");
    }
    if (this.amyeittasote(this._bd, this._wd)) {
      hs.push("Amyeittasote");
    }
    if (this.warameittugyi(this._bd, this._wd)) {
      hs.push("Warameittugyi");
    }
    if (this.warameittunge(this._bd, this._wd)) {
      hs.push("Warameittunge");
    }
    if (this.yatpote(this._bd, this._wd)) {
      hs.push("Yatpote");
    }
    if (this.thamaphyu(this._bd, this._wd)) {
      hs.push("Thamaphyu");
    }
    if (this.nagapor(this._bd, this._wd)) {
      hs.push("Nagapor");
    }
    if (this.yatyotema(this._bm, this._bd)) {
      hs.push("Yatyotema");
    }
    if (this.mahayatkyan(this._bm, this._bd)) {
      hs.push("Mahayatkyan");
    }
    if (this.shanyat(this._bm, this._bd)) {
      hs.push("Shanyat");
    }
    return hs;
  }
}
//-- Holidays
class BcHolidays {
  public holidaysArray: string[];
  private _year: number;
  private _jdn: number;
  private _month: number;
  private _mp: number;
  private _day: number;
  private _by: number;
  private _bm: number;
  private _bd: number;
  private _bmt: number;
  constructor({ jdn, year, month, day, mp, by, bm, bd, bmt }: HolidaysOpts) {
    this._jdn = jdn;
    this._year = year;
    this._month = month;
    this._day = day;
    this._mp = mp;
    this._by = by;
    this._bm = bm;
    this._bd = bd;
    this._bmt = bmt;
    this.holidaysArray = this.init();
  }
  /**
   *  **Get public holidays of Burma on Burmese Calendar's date**
   * @param by Burmese Calendar Year
   * @param bm Burmese Calendar Month
   * @param bd Burmese Calendar Day
   * @param mp Moon Phase
   * @param hs String array to collect holidays
   */
  private bmHolidays(
    by: number,
    bm: number,
    bd: number,
    mp: number,
    hs: string[]
  ): void {
    if (bm === 2 && mp === 1) {
      hs.push("Buddha Day");
    } //Vesak day
    else if (bm === 4 && mp === 1) {
      hs.push("Beginning of Buddhist Lent");
    } //Warso day
    else if (bm === 7 && mp === 1) {
      hs.push("End of Buddhist Lent");
    } else if (by >= 1379 && bm === 7 && (bd === 14 || bd === 16)) {
      hs.push("Holiday");
    } else if (bm === 8 && mp === 1) {
      hs.push("Tazaungdaing");
    } else if (by >= 1379 && bm === 8 && bd === 14) {
      hs.push("Holiday");
    } else if (by >= 1282 && bm === 8 && bd === 25) {
      hs.push("National Day");
    } else if (bm === 10 && bd === 1) {
      hs.push("Karen New Year's Day");
    } else if (bm === 12 && mp === 1) {
      hs.push("Tabaung Pwe");
    }
  }
  /**
   * **Get public holidays of Myanmar on Gregorian date**
   * @param year
   * @param month
   * @param day
   * @param hs String array to collect holidays
   */
  private gregorianHolidays(
    year: number,
    month: number,
    day: number,
    hs: string[]
  ): void {
    if (year >= 2018 && year <= 2021 && month === 1 && day === 1) {
      hs.push("New Year's Day");
    } else if (year >= 1948 && month === 1 && day === 4) {
      hs.push("Independence Day");
    } else if (year >= 1947 && month === 2 && day === 12) {
      hs.push("Union Day");
    } else if (year >= 1958 && month === 3 && day === 2) {
      hs.push("Peasants' Day");
    } else if (year >= 1945 && month === 3 && day === 27) {
      hs.push("Armed Forces Day");
    } else if (year >= 1923 && month === 5 && day === 1) {
      hs.push("Labour Day");
    } else if (year >= 1947 && month === 7 && day === 19) {
      hs.push("Martyrs' Day");
    } else if (year >= 1752 && month === 12 && day === 25) {
      hs.push("Christmas");
    } else if (year === 2017 && month === 12 && day === 30) {
      hs.push("Holiday");
    } else if (year >= 2017 && year <= 2021 && month === 12 && day === 31) {
      hs.push("Holiday");
    }
  }
  /**
   * **Get Thingyan Holidays**
   * @param jdn Julian Day Number
   * @param by Burmese Calendar Year
   * @param bmt Burmese Month Type
   * @param hs String array to collect holidays
   */
  private thingyanHolidays(jdn: number, by: number, bmt: number, hs: string[]) {
    //solar year (365.2587565)
    const SY: number = 1577917828.0 / 4320000.0;
    //beginning of 0 ME
    const MO: number = 1954168.050623;
    //start of Thingyan
    const BGNTG: number = 1100;
    //third era
    const SE3: number = 1312;
    const atat = SY * (by + bmt) + MO;
    let atar = 0;
    if (by >= SE3) {
      atar = atat - 2.169918982;
    } else {
      atar = atat - 2.1675;
    }
    const akyaNay = Math.floor(atar);
    const atatNay = Math.floor(atat);
    if (jdn === atatNay + 1) {
      hs.push("Burmese New Year's Day");
    }
    if (by + bmt >= BGNTG) {
      if (jdn === atatNay) {
        hs.push("Thingyan Atat");
      } else if (jdn > akyaNay && jdn < atatNay) {
        hs.push("Thingyan Akyat");
      } else if (jdn === akyaNay) {
        hs.push("Thingyan Akya");
      } else if (jdn === akyaNay - 1) {
        hs.push("Thingyan Akyo");
        //conditional add thingyan holidays
      } else if (
        by + bmt >= 1369 &&
        by + bmt < 1379 &&
        (jdn === akyaNay - 2 || (jdn >= atatNay + 2 && jdn <= akyaNay + 7))
      ) {
        hs.push("Holiday");
      } else if (
        by + bmt >= 1384 &&
        by + bmt <= 1385 &&
        (jdn === akyaNay - 5 ||
          jdn === akyaNay - 4 ||
          jdn === akyaNay - 3 ||
          jdn === akyaNay - 2)
      ) {
        hs.push("Holiday");
      } else if (by + bmt >= 1386 && jdn >= atatNay + 2 && jdn <= akyaNay + 7) {
        hs.push("Holiday");
      }
    }
  }
  private eid_day(jdn: number, hs: string[]) {
    if (eidDays.includes(jdn)) {
      hs.push("Eid al-Adha");
    }
  }
  private substitute(jdn: number, hs: string[]) {
    if (substituteHolidays.includes(jdn)) {
      hs.push("Eid al-Adha");
    }
  }
  private init() {
    const hhs: string[] = [];
    this.bmHolidays(this._by, this._bm, this._bd, this._mp, hhs);
    this.gregorianHolidays(this._year, this._month, this._day, hhs);
    this.thingyanHolidays(this._jdn, this._by, this._bmt, hhs);
    this.eid_day(this._jdn, hhs);
    this.substitute(this._jdn, hhs);
    return hhs;
  }
}
// calendar calculation
class BcCal {
  /**
   * The length of a solar year in the Burmese calendar is defined as 1577917828/4320000 (365.2587565) days [Irwin, 1909].
   */
  protected SY: number = 1577917828 / 4320000;
  /**
   * The length of a lunar month in the Burmese calendar is defined as 1577917828/53433336 (29.53058795) days [Irwin, 1909].
   */
  protected LM: number = 1577917828 / 53433336;
  /**
   * Estimated Julian Date value of the starting time of the Burmese year zero [Yan Naing Aye,2013]
   */
  protected MO: number = 1954168.050623;
  /**
   * List of Myanmer month name
   */
  protected BurmeseMonthName: string[] = [
    "First Waso",
    "Tagu",
    "Kason",
    "Nayon",
    "Waso",
    "Wagaung",
    "Tawthalin",
    "Thadingyut",
    "Tazaungmon",
    "Nadaw",
    "Pyatho",
    "Tabodwe",
    "Tabaung",
    "Late Tagu",
    "Late Kason",
  ];
  /**
   * Moon Phases
   */
  protected MoonPhase: string[] = ["Waxing", "Full Moon", "Waning", "New Moon"];
  /**
   * ဝါဆိုညှိကိန်း WO အတွက် ရှာလိုသောမြန်မာနှစ် FME တွင်ပါမပါ ပါလျင် ကွဲလွဲသောနှစ်အရေအတွက်အား ရရှိမည့် လုပ်ဆောင်ချက်ဖြစ်သည်။
   *
   * Is the Myanmar Year include in FME? If include, the function returns number years of different , else returns 0.
   *
   * ရလဒ်အား ဝါဆိုညှိကိန်းတွင်သွားပေါင်းမည်ဖြစ်သဖြငိ့ ဇယားတွင်မပါပါက အဖြေ သုည သတ်မှတ်ထားပါသည်။
   *
   * @param by Burmese Year
   * @returns ကွဲလွဲသောနှစ်အရေအတွက်
   */
  protected searchFme(by: number): number {
    const found: number[] | undefined = FME.find((i: number[]) => i[0] === by);
    let result = 0;
    if (found !== undefined) {
      result = found[1];
    }
    return result;
  }
  /**
   * Checks if a given year is valid.
   * A valid year is a year that is non-negative,
   * an integer, and has a string representation of length 4 or less.
   * @param by The Burmese year to check
   * @returns If the year is valid
   */
  protected validYear = (by: number): boolean => {
    const is4 = by.toString().split("").length <= 4;
    return by >= 0 && Number.isInteger(by) && is4;
  };
  /**
   * Burmese Year to Kali Yuga year
   * @param by Burmese year
   * @returns Kali Yuga year
   */
  public by2ky = (by: number): number => {
    if (!this.validYear(by)) {
      throw new Error("Invalid Burmese Year");
    }
    return by + 3739;
  };
  /**
   * Burmese Year to Sasana Year ( Buddhist Era - BE)
   * @param by Burmese Year
   * @returns Sasana Year
   */
  public by2ssy = (by: number): number => {
    if (!this.validYear(by)) {
      throw new Error("Invalid Burmese Year");
    }
    return by + 1182;
  };
  /**
   * Burmese calendar era id
   *
   * Era Ids
   *  - id = 3 : The third era (the era after Independence 1312 ME and after)
   *  - id = 2 : The second era (the era under British colony: 1217 ME - 1311 ME)
   *  - The first era (the era of Myanmar kings: ME1216 and before)
   *    - id = 1.3 : Thandeikta (ME 1100 - 1216)
   *    - id = 1.2 : Makaranta system 2 (ME 798 - 1099)
   *    - id = 1.1 : Makaranta system 1 (ME 0 - 797)
   * @param by Burmese Year
   */
  protected eraId = (by: number) => {
    if (!this.validYear(by)) {
      throw new Error("Invalid Burmese Year");
    }
    let id: EraIds = 1.1;
    if (by >= 1312) {
      id = 3;
    } else if (by < 1312 && by >= 1217) {
      id = 2;
    } else if (by < 1217 && by >= 1100) {
      id = 1.3;
    } else if (by < 1100 && by >= 798) {
      id = 1.2;
    } else {
      id = 1.1;
    }
    return id;
  };
  /**
   * Get some Burmese year constants depending on era
   *
   * @param by Burmese year
   * @returns { WO: number; NM: number } - warhtat offset to compensate and number of months to find excess days
   */
  protected getWoNm = (by: number): GetWoNm => {
    const eraConfigurations: Record<EraIds, GetWoNm> = {
      3: { WO: -0.5, NM: 8 },
      2: { WO: -1, NM: 4 },
      1.3: { WO: -0.85, NM: -1 },
      1.2: { WO: -1.1, NM: -1 },
      1.1: { WO: -1.1, NM: -1 },
    };
    // error handle already here
    const id: EraIds = this.eraId(by);
    return {
      WO: eraConfigurations[id].WO + this.searchFme(by),
      NM: eraConfigurations[id].NM,
    };
  };
  /**
   * ရက်ပိုညှိကိန်း TA ဝါထပ်ကိန်း TW
   *
   * TA =  The number of excess days for past 4 lunar month before the beginning of a Burmese year
   *
   * TW =  The threshold to determine whether the excess days exceeds {@link LM} within the next 8 months of a Burmese year.
   *
   * @param by Burmese Year
   *
   */
  protected getTaTw = (by: number) => {
    // ရက်ပိုညှိကိန်း TA ဝါထပ်ကိန်း TW
    const { NM } = this.getWoNm(by);
    return {
      TA: (12 - NM) * (this.SY / 12 - this.LM),
      TW: this.LM - NM * (this.SY / 12 - this.LM),
    };
  };
  /**
   * The number of excess days of a Burmese year
   *
   * @param by Burmese Year
   */
  protected excessDays = (by: number): number => {
    // ed =( SY ( my + 3739 ) ) mod LM
    const edays: number = (this.SY * this.by2ky(by)) % this.LM;
    /*
      if ed < TA then
      ed = ed + LM
      end if
       */
    return edays < this.getTaTw(by).TA ? edays + this.LM : edays;
  };
  /**
   * The Julian Day Number of the beginning of a Burmese year.
   * @param by Burmese year
   * @returns The Julian Day Number of the beginning of the given Burmese year.
   */
  public newYearTime = (by: number): number => {
    return this.SY * by + this.MO;
  };
  /**
   * Checking a year for intercalary month or not
   * @param by Burmese Year
   * @returns 1=warhtat, 0=common
   */
  public checkWarhtat = (by: number) => {
    const ed = this.excessDays(by);
    const { TW } = this.getTaTw(by);
    const myt = ed >= TW ? 1 : 0;
    let result = 0;
    if (WTE.zero.includes(by)) {
      result = 0;
    } else if (WTE.one.includes(by)) {
      result = 1;
    } else {
      result = myt;
    }
    return result;
  };
  /**
   * Full moon day of 2nd Warso
   * @param by Burmese Year
   * @returns Full moon day of 2nd Warso
   */
  public searchWasoFullMoon = (by: number) => {
    return Math.round(
      this.newYearTime(by) -
        this.excessDays(by) +
        4.5 * this.LM +
        this.getWoNm(by).WO
    );
  };
  public getLeapYearData = (by: number): GetLeapYearData => {
    const a = this.checkWarhtat(by);
    const b1 = this.searchWasoFullMoon(by);
    let c = 0;
    let L = 0;
    let bs = 0;
    for (let i = 1; i < 4; i++) {
      bs = this.searchWasoFullMoon(by - i);
      c = this.checkWarhtat(by - i);
      L = i;
      if (c === 1) {
        break;
      }
    }
    const b3 = (b1 - bs) % 354;
    const myt = a === 0 ? a : Math.floor(b3 / 31) + a;
    const fm = a === 1 ? b1 : bs + 354 * L;
    const err = a === 1 && b3 !== 31 && b3 !== 30 ? 1 : 0;
    const tg1 = bs + 354 * L - 102;
    return { myt, tg1, fm, err };
  };
  /**
   * Calculate the length of a month in the Burmese calendar.
   *
   * @param yt The type of the Burmese year.
   * @param bm The month in the Burmese calendar [0-14].
   * @returns The length of the month (30 for even months, 29 for odd months, with adjustments for "Nayon"=30 for "Big Warhtat").
   */
  protected monthLength = (yt: number, bm: number) => {
    /* စုံ = ၃၀ မ = ၂၉ */
    let ml = 30 - (bm % 2);
    /*
      ဝါကြီးထပ်နှစ်အတွက် နယုန်လတွင်တစ်ရက်ပေါင်း
      29 + 1 = 30 days
      */
    if (bm === 3) {
      ml += Math.floor(yt / 2);
    }
    return ml;
  };
  public j2b = (jdn: number): JTB => {
    const j: number = Math.round(jdn);
    // return
    const by: number = Math.floor((j - 0.5 - this.MO) / this.SY);
    const yc: GetLeapYearData = this.getLeapYearData(by);
    // ရက်အရေအတွက်
    let dd: number = j - yc.tg1 + 1;
    const b: number = Math.floor(yc.myt / 2);
    const c: number = Math.floor(1 / (yc.myt + 1));

    const myl: number = 354 + (1 - c) * 30 + b;
    // month type: late =1 or early = 0
    const bmt = Math.floor((dd - 1) / myl);
    dd -= bmt * myl;
    // adjust day count and threshold
    const a: number = Math.floor((dd + 423) / 512);
    let bm: number = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
    const e: number = Math.floor((bm + 12) / 16);
    const f: number = Math.floor((bm + 11) / 16);
    // return
    const bd: number =
      dd - Math.floor(29.544 * bm - 29.26) - b * e + c * f * 30;
    // adjust month numbers for late months
    // return
    bm += f * 3 - e * 4 + 12 * bmt;
    //return
    const yt: number = yc.myt;
    // ------------------------------------
    // length of Burmese month
    const bml = this.monthLength(yt, bm);
    // Moon Phase
    const mp =
      Math.floor((bd + 1) / 16) + Math.floor(bd / 16) + Math.floor(bd / bml);
    // fortnight day [1-15]
    const fd = bd - 15 * Math.floor(bd / 16);
    // Sasana Year ( Buddhist Era - BE)
    const ssy = by + 1182;
    // week days id
    const wd = (jdn + 2) % 7;
    // --- string
    const bm_str = this.BurmeseMonthName[bm];
    const mp_str = this.MoonPhase[mp];
    return { yt, ssy, by, bm, bd, fd, mp, bml, bmt, wd, bm_str, mp_str };
  };
}
// Translate
class BcTranslate {
  protected langs: string[][] = [
    //
    ["Sunday", "တနင်္ဂနွေ"],
    ["Monday", "တနင်္လာ"],
    ["Tuesday", "အင်္ဂါ"],
    ["Wednesday", "ဗုဒ္ဓဟူး"],
    ["Thursday", "ကြာသပတေး"],
    ["Friday", "သောကြာ"],
    ["Saturday", "စနေ"],
    //
    //
    ["January", "ဇန်နဝါရီ"],
    ["February", "ဖေဖော်ဝါရီ"],
    ["March", "မတ်"],
    ["April", "ဧပြီ"],
    ["May", "မေ"],
    ["June", "ဇွန်"],
    ["July", "ဇူလိုင်"],
    ["August", "ဩဂုတ်"],
    ["September", "စက်တင်ဘာ"],
    ["October", "အောက်တိုဘာ"],
    ["November", "နိုဝင်ဘာ"],
    ["December", "ဒီဇင်ဘာ"],
    //
    //
    ["Tagu", "တန်ခူး"],
    ["Kason", "ကဆုန်"],
    ["Nayon", "နယုန်"],
    ["Waso", "ဝါဆို"],
    ["Wagaung", "ဝါခေါင်"],
    ["Tawthalin", "တော်သလင်း"],
    ["Thadingyut", "သီတင်းကျွတ်"],
    ["Tazaungmon", "တန်ဆောင်မုန်း"],
    ["Nadaw", "နတ်တော်"],
    ["Pyatho", "ပြာသို"],
    ["Tabodwe", "တပို့တွဲ"],
    ["Tabaung", "တပေါင်း"],
    ["First Waso", "ပ-ဝါဆို"],
    ["Late Tagu", "နှောင်းတန်ခူး"],
    ["Late Kason", "နှောင်းကဆုန်"],
    //
    ["Waxing", "လဆန်း"],
    ["Waning", "လဆုတ်"],
    ["Full Moon", "လပြည့်"],
    ["New Moon", "လကွယ်"],
    //
    ["East", "အရှေ့"],
    ["West", "အနောက်"],
    ["South", "တောင်"],
    ["North", "မြောက်"],
    //
    ["Binga", "ဘင်္ဂ"],
    ["Atun", "အထွန်း"],
    ["Yaza", "ရာဇ"],
    ["Adipati", "အဓိပတိ"],
    ["Marana", "မရဏ"],
    ["Thike", "သိုက်"],
    ["Puti", "ပုတိ"],
    //
    ["Amyeittasote", "အမြိတ္တစုတ်"],
    ["Warameittugyi", "ဝါရမိတ္တုကြီး"],
    ["Warameittunge", "ဝါရမိတ္တုငယ်"],
    ["Thamaphyu", "သမားဖြူ"],
    ["Thamanyo", "သမားညို"],
    ["Yatpote", "ရက်ပုပ်"],
    ["Yatyotema", "ရက်ယုတ်မာ"],
    ["Mahayatkyan", "မဟာရက်ကြမ်း"],
    ["Nagapor", "နဂါးပေါ်"],
    ["Shanyat", "ရှမ်းရက်"],
    //
    ["Ogre", "ဘီလူး"],
    ["Elf", "နတ်"],
    ["Human", "လူ"],
    //
    ["Sabbath Eve", "အဖိတ်"],
    ["Sabbath", "ဥပုသ်"],
    //
    ["Yatyaza", "ရက်ရာဇာ"],
    ["Pyathada", "ပြဿဒါး"],
    ["Afternoon Pyathada", "မွန်းလွဲပြဿဒါး"],
    //
    ["Independence Day", "လွတ်လပ်ရေးနေ့"],
    ["Union Day", "ပြည်ထောင်စုနေ့"],
    ["Peasants' Day", "တောင်သူလယ်သမားနေ့"],
    ["Labour Day", "အလုပ်သမားနေ့"],
    ["Martyrs' Day", "အာဇာနည်နေ့"],
    ["Holiday", "ရုံးပိတ်ရက်"],
    ["Armed Forces Day", "တပ်မတော်နေ့"],
    ["New Year's Day", "နှစ်သစ်ကူးရုံးပိတ်ရက်"],
    ["Christmas", "ခရစ္စမတ်နေ့"],
    //
    ["Burmese New Year's Day", "နှစ်ဆန်း"],
    ["Thingyan Atat", "သင်္ကြန်အတက်နေ့"],
    ["Thingyan Akyat", "သင်္ကြန်အကြတ်နေ့"],
    ["Thingyan Akya", "သင်္ကြန်အကျနေ့"],
    ["Thingyan Akyo", "သင်္ကြန်အကြိုနေ့"],
    //
    ["Eid al-Adha", "အိဒ်နေ့"],
    ["Deepavali", "ဒီဝါလီ"],
    //
    ["Buddha Day", "ဗုဒ္ဓနေ့"],
    ["Beginning of Buddhist Lent", "ဓမ္မစကြာနေ့"],
    ["End of Buddhist Lent", "သီတင်းကျွတ်မီးထွန်းပွဲ"],
    ["Tazaungdaing", "တန်ဆောင်တိုင်"],
    ["National Day", "အမျိုးသားနေ့"],
    ["Karen New Year's Day", "ကရင်နှစ်သစ်ကူး"],
    ["Tabaung Pwe", "တပေါင်းပွဲ"],
  ];
  /**
   * Translates a number from 0-9 into a string based on the given language.
   * If the language is English, the number is returned as is.
   * If the language is not English, the number is translated into a string based on the Myanmer digits.
   * @param a The number to translate.
   * @param lang The language to translate the number into. Defaults to English.
   * @returns The translated number as a string.
   */
  public translateNum(a: number, lang?: Language): string | number {
    const l: Language = lang ?? "English";
    const b: string[] = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    let r: number | string;
    if (l === "English") {
      r = a;
    } else {
      const aa: string[] = a.toString().split("");
      const bb: string[] = [];
      aa.map((i) => {
        const x: string = b[Number.parseInt(i)];
        bb.push(x);
      });
      r = bb.join("");
    }
    return r;
  }
  /**
   * Translates a string or an array of strings based on the given language.
   * If the language is English, the input string(s) are returned as is.
   * If the language is not English, the string(s) are translated using the provided array.
   *
   * @param str The string or array of strings to translate.
   * @param array A 2D array where each sub-array contains a pair of strings,
   *              with the first element being the original string and the second the translated string.
   * @param lang The language to translate the string(s) into. Defaults to English.
   * @returns The translated string or array of strings.
   */

  public translateStr(str: string | string[], lang?: Language) {
    const l: Language = lang ?? "English";
    let r: string | string[] = "";
    if (l === "English") {
      r = str;
    } else {
      if (Array.isArray(str)) {
        const y: string[] = [];
        str.map((i) => {
          const z = this.langs.filter((k) => k[0] === i);
          y.push(z[0][1]);
        });
        r = y;
      } else {
        const x = this.langs.find((i) => i[0] === str);
        r = x ? x[1] : "";
      }
    }
    return r;
  }
}
// New instances for calendar calculation and translate
const B = new BcCal();
const T = new BcTranslate();
//
export class Calendar {
  /**
   * Name of Months
   */
  public MONTHS: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  /**
   * List of short month name
   */
  public MONTH_SHORT = this.MONTHS.map((i) => i.split("").slice(0, 3).join(""));
  /**
   * Weekday Name
   */
  public WEEK_DAYS: string[] = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  /**
   * Weekday shorts
   */
  public WEEK_DAYS_SHORT = this.WEEK_DAYS.map((i) =>
    i.split("").slice(0, 3).join("")
  );
  private _lang: Language = "English";
  private _tz: TimeZones = "GMT";
  private _ct: CalendarTypes = "Gregorian";
  private _year: number = new Date().getFullYear();
  private cal() {
    // days of each month in this._langyear
    const month_array: number[] = monthsDaysArray(this._year);
    // Sasana year and temp storage for that
    let _ssy: string | number = "";
    const ssy_str: string[] = [];
    const ssy_num: number[] = [];
    const ssy_ids: number[] = [];
    // Burmese year and temp storage for that
    let _by: string | number = "";
    const by_str: string[] = [];
    const by_num: number[] = [];
    const by_ids: number[] = [];
    // year object
    const year_object: YearViewObject = {
      year: {
        id: this._year,
        str: T.translateNum(this._year, this._lang),
      },
      sasana_years: {
        ids: [],
        str: [],
      },
      burmese_years: {
        ids: [],
        str: [],
      },
      month_views: [],
    };
    // ==========================
    //     Start of Months loop
    // ==========================
    for (let i = 0; i < 12; i++) {
      const days_in_month: number = month_array[i];
      const bm_str: string[] = [];
      const bm_index: number[] = [];
      const month_object: MonthViewObject = {
        year: {
          id: this._year,
          str: T.translateNum(this._year, this._lang),
        },
        month: {
          id: i + 1,
          long: T.translateStr(this.MONTHS[i], this._lang) as string,
          short: this.MONTH_SHORT[i],
        },
        sasana_years: {
          ids: [],
          str: [],
        },
        burmese_years: {
          ids: [],
          str: [],
        },
        burmese_months: {
          index: [],
          str: [],
        },
        date_views: [],
      };
      // ==========================
      //     Start of Days loop
      // ==========================
      for (let j = 1; j <= days_in_month; j++) {
        const _month = i + 1;
        // get jdn
        const jdn: number = dateTime2Julian({
          year: this._year,
          month: _month,
          day: j,
          timeZone: this._tz,
          calendarType: this._ct,
        }).jdn;
        // Burmese Calendar Info
        const bcal: JTB = B.j2b(jdn);
        // This `wdid` is not related to calculation just for month view component
        const wd_id = bcal.wd - 1;
        // [0=sun , ... , 6=sat] to place first day of month
        const wdid = wd_id === -1 ? 6 : wd_id;
        const astro = new BcAstro({
          by: bcal.by,
          bm: bcal.bm,
          bd: bcal.bd,
          wd: bcal.wd,
          lm: bcal.bml,
        });
        const hlds = new BcHolidays({
          jdn: jdn,
          year: this._year,
          month: _month,
          day: j,
          mp: bcal.mp,
          bmt: bcal.bmt,
          by: bcal.by,
          bm: bcal.bm,
          bd: bcal.bd,
        });
        bm_str.push(T.translateStr(bcal.bm_str, this._lang) as string);
        bm_index.push(bcal.bm);
        ssy_ids.push(bcal.ssy);
        by_ids.push(bcal.by);
        // _ssy
        _ssy = T.translateNum(bcal.ssy, this._lang);
        if (typeof _ssy === "string") {
          ssy_str.push(_ssy);
        } else if (typeof _ssy === "number") {
          ssy_num.push(_ssy);
        }
        // _by
        _by = T.translateNum(bcal.by, this._lang);
        if (typeof _by === "string") {
          by_str.push(_by);
        } else if (typeof _by === "number") {
          by_num.push(_by);
        }
        const date_object: DateViewObject = {
          jdn: jdn,
          year: {
            id: this._year,
            str: T.translateNum(this._year, this._lang),
          },
          month: {
            id: i + 1,
            long: T.translateStr(this.MONTHS[i], this._lang) as string,
            short: this.MONTH_SHORT[i],
          },
          day: {
            id: j,
            str: T.translateNum(j, this._lang),
          },
          weekday: {
            id: wdid,
            long: T.translateStr(this.WEEK_DAYS[bcal.wd], this._lang) as string,
            short: this.WEEK_DAYS_SHORT[bcal.wd],
          },
          isHoliday: hlds.holidaysArray.length > 0 ? true : false,
          burmese_cal: {
            sasana_year: {
              id: bcal.ssy,
              str: T.translateNum(bcal.ssy, this._lang),
            },
            burmese_year: {
              id: bcal.by,
              str: T.translateNum(bcal.by, this._lang),
            },
            burmese_month: {
              index: bcal.bm,
              str: T.translateStr(bcal.bm_str, this._lang) as string,
            },
            moon_phase: {
              index: bcal.mp,
              str: T.translateStr(bcal.mp_str, this._lang) as string,
            },
            fortnight_day: {
              id: bcal.fd,
              str: T.translateNum(bcal.fd, this._lang),
            },
            burmese_day: {
              id: bcal.bd,
              str: T.translateNum(bcal.bd, this._lang),
            },
            sabbath: {
              index: astro.sabbath.index,
              str: T.translateStr(astro.sabbath.str, this._lang) as string,
            },
            yatyaza: {
              index: astro.yatyaza.index,
              str: T.translateStr(astro.yatyaza.str, this._lang) as string,
            },
            pyathada: {
              index: astro.pyathada.index,
              str: T.translateStr(astro.pyathada.str, this._lang) as string,
            },
            nagahle: {
              index: astro.nagahle.index,
              str: T.translateStr(astro.nagahle.str, this._lang) as string,
            },
            nakhat: {
              index: astro.natkhat.index,
              str: T.translateStr(astro.natkhat.str, this._lang) as string,
            },
            mahabote: {
              index: astro.mahabote.index,
              str: T.translateStr(astro.mahabote.str, this._lang) as string,
            },
            astro_days: T.translateStr(astro.astroDays, this._lang) as string[],
            public_holiday: T.translateStr(
              hlds.holidaysArray,
              this._lang
            ) as string[],
          },
        };
        // push day object to month object end of days loop
        month_object.date_views.push(date_object);
        // == End of Days loop
      }
      // remove all duplicate values from string or number arrays of month object push by days loop
      month_object.burmese_months.index = uniqNumber(bm_index);
      month_object.burmese_months.str = uniqString(bm_str);
      // push ssy from temp storage
      month_object.sasana_years.ids = uniqNumber(ssy_ids);
      month_object.sasana_years.str =
        typeof _ssy === "string" ? uniqString(ssy_str) : uniqNumber(ssy_num);
      // push burmese year from temp storage
      month_object.burmese_years.ids = uniqNumber(by_ids);
      month_object.burmese_years.str =
        typeof _by === "string" ? uniqString(by_str) : uniqNumber(by_num);
      // push month object to year object
      year_object.month_views.push(month_object);
      // End of Months loop
    }
    // remove all duplicate values from string or number arrays of year object push by  days and months loops
    year_object.sasana_years.ids = uniqNumber(ssy_ids);
    year_object.sasana_years.str =
      typeof _ssy === "string" ? uniqString(ssy_str) : uniqNumber(ssy_num);
    // --
    year_object.burmese_years.ids = uniqNumber(by_ids);
    year_object.burmese_years.str =
      typeof _by === "string" ? uniqString(by_str) : uniqNumber(by_num);
    return year_object;
  }
  /**
   * Update the calendar to a specific year and return the detailed year view.
   *
   * This method sets the internal state of the calendar to the specified year,
   * using the provided or default language and time zone. It then computes and
   * returns the detailed information for that year in the Burmese calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @param tz - Optional time zone setting for the calendar. Defaults to "GMT".
   * @param ct - Optional calendar type setting for the calendar. Defaults to "Gregorian".
   * @returns The year object containing detailed information for the specified year.
   */
  public yearView({
    year,
    lang = "English",
    tz = "GMT",
    ct = "Gregorian",
  }: YearViewOptions): YearViewObject {
    this._year = year;
    this._lang = lang;
    this._tz = tz;
    this._ct = ct;
    return this.cal();
  }
  /**
   * Update the calendar to a specific month and return the detailed month view.
   *
   * This method sets the internal state of the calendar to the specified year
   * and month, using the provided or default language and time zone. It then
   * computes and returns the detailed information for that month in the Burmese
   * calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param month - The month to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @param tz - Optional time zone setting for the calendar. Defaults to "GMT".
   * @param ct - Optional calendar type setting for the calendar. Defaults to "Gregorian".
   * @returns The month object containing detailed information for the specified month.
   */
  public monthView({
    year,
    month,
    lang = "English",
    tz = "GMT",
    ct = "Gregorian",
  }: MontnViewOptions): MonthViewObject {
    this._year = year;
    this._lang = lang;
    this._tz = tz;
    this._ct = ct;
    return this.cal().month_views[month - 1];
  }
  /**
   * Update the calendar to a specific date and return the detailed date view.
   *
   * This method sets the internal state of the calendar to the specified year,
   * month, and date, using the provided or default language and time zone. It
   * then computes and returns the detailed information for that date in the
   * Burmese calendar.
   *
   * @param year - The year to be set in the calendar.
   * @param month - The month to be set in the calendar.
   * @param day - The day of the month to be set in the calendar.
   * @param lang - Optional language setting for the calendar. Defaults to "English".
   * @param tz - Optional time zone setting for the calendar. Defaults to "GMT".
   * @param ct - Optional calendar type setting for the calendar. Defaults to "Gregorian".
   * @returns The date object containing detailed information for the specified date.
   */
  public dateView({
    year,
    month,
    day,
    lang = "English",
    tz = "GMT",
    ct = "Gregorian",
  }: DateViewOptions): DateViewObject {
    this._year = year;
    this._lang = lang;
    this._tz = tz;
    this._ct = ct;
    return this.cal().month_views[month - 1].date_views[day - 1];
  }
}

/**
 * Generates an array of numbers in a specified range.
 *
 * This function returns an array containing all the numbers from the `start`
 * value to the `end` value, inclusive. The `end` value must be greater than
 * the `start` value, otherwise an error is thrown.
 *
 * @param start - The starting number of the range.
 * @param end - The ending number of the range, must be greater than `start`.
 * @returns An array of numbers from `start` to `end`.
 * @throws An error if `end` is not greater than `start`.
 */

export function numberRange(start: number, end: number): number[] {
  if (end <= start) {
    throw new Error("End must be greater than Start");
  }
  const length = end - start + 1;
  const na = Array(length);
  for (let i = 0; i < length; i++) {
    na[i] = start + i;
  }
  return na;
}

/**
 * Calculates the number of blank cells before and after a month in a calendar.
 *
 * @param weekdayId - The day of the week of the first day of the month, where
 *                    0 is Sunday, 1 is Monday, ..., 6 is Saturday.
 * @param daysInMonth - The number of days in the month.
 * @returns An object containing the number of blank cells before and after the
 *          month.
 * @example
 * const result = blankCells(3, 31);
 * console.log(result.before); // 3
 * console.log(result.after);  // 1
 */
export function blankCells(
  weekdayId: number,
  daysInMonth: number
): { before: number; after: number } {
  const t = (weekdayId % 7) + daysInMonth;
  return {
    before: weekdayId % 7,
    after: t <= 35 ? Math.max(0, 35 - t) : Math.max(0, 42 - t),
  };
}
