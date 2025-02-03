(() => {
  // src/bcal/astro-days/as.ts
  function thamanyo(bm, wd) {
    const bmt = Math.floor(bm / 13);
    let bm1 = bm % 13 + bmt;
    if (bm1 <= 0) bm1 = 4;
    const m1 = bm1 - 1 - Math.floor(bm1 / 9);
    const wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
    const wd2 = (wd + 7 - wd1) % 7;
    const thamanyo2 = wd2 <= 1 ? 1 : 0;
    return thamanyo2;
  }
  function thamaphyu(bd, wd) {
    const mf = bd - 15 * Math.floor(bd / 16);
    let thamaphyu2 = 0;
    const wda = [1, 2, 6, 6, 5, 6, 7];
    const wdb = [0, 1, 0, 0, 0, 3, 3];
    if (mf === wda[wd] || mf === wdb[wd] || mf === 4 && wd === 5) {
      thamaphyu2 = 1;
    }
    return thamaphyu2;
  }
  function amyeittasote(bd, wd) {
    const mf = bd - 15 * Math.floor(bd / 16);
    const wda = [5, 8, 3, 7, 2, 4, 1];
    return mf === wda[wd] ? 1 : 0;
  }
  function warameittugyi(bd, wd) {
    const mf = bd - 15 * Math.floor(bd / 16);
    const wda = [7, 1, 4, 8, 9, 6, 3];
    return mf === wda[wd] ? 1 : 0;
  }
  function warameittunge(bd, wd) {
    const mf = bd - 15 * Math.floor(bd / 16);
    const wn = (wd + 6) % 7;
    return 12 - mf === wn ? 1 : 0;
  }
  function yatpote(bd, wd) {
    const mf = bd - 15 * Math.floor(bd / 16);
    const wda = [8, 1, 4, 6, 9, 8, 7];
    return mf === wda[wd] ? 1 : 0;
  }
  function nagapor(bd, wd) {
    const wda = [26, 21, 2, 10, 18, 2, 21];
    const wdb = [17, 19, 1, 0, 9, 0, 0];
    if (bd === wda[wd] || bd === wdb[wd] || bd === 2 && wd === 1 || (bd === 12 || bd === 4 || bd === 18) && wd === 2) {
      return 1;
    }
    return 0;
  }
  function yatyotema(bm, bd) {
    let bm1 = bm % 13 || 13;
    if (bm1 <= 0) bm1 = 4;
    const mf = bd - 15 * Math.floor(bd / 16);
    const m1 = bm1 % 2 ? bm1 : (bm1 + 9) % 12;
    const adjustedM1 = (m1 + 4) % 12 + 1;
    const yatyotema2 = mf === adjustedM1 ? 1 : 0;
    return yatyotema2;
  }
  function mahayatkyan(bm, bd) {
    let bm1 = bm;
    if (bm1 <= 0) bm1 = 4;
    const mf = bd - 15 * Math.floor(bd / 16);
    let mahayatkyan2 = 0;
    const m1 = (Math.floor(bm1 % 12 / 2) + 4) % 6 + 1;
    if (mf === m1) mahayatkyan2 = 1;
    return mahayatkyan2;
  }
  function shanyat(bm, bd) {
    const bmt = Math.floor(bm / 13);
    let bm1 = bm % 13 + bmt;
    if (bm1 <= 0) bm1 = 4;
    const mf = bd - 15 * Math.floor(bd / 16);
    const sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
    const shanyat2 = mf === sya[bm1 - 1] ? 1 : 0;
    return shanyat2;
  }
  function astro(bm, bd, wd, hs) {
    if (thamanyo(bm, wd)) {
      hs.push("Thamanyo");
    }
    if (amyeittasote(bd, wd)) {
      hs.push("Amyeittasote");
    }
    if (warameittugyi(bd, wd)) {
      hs.push("Warameittugyi");
    }
    if (warameittunge(bd, wd)) {
      hs.push("Warameittunge");
    }
    if (yatpote(bd, wd)) {
      hs.push("Yatpote");
    }
    if (thamaphyu(bd, wd)) {
      hs.push("Thamaphyu");
    }
    if (nagapor(bd, wd)) {
      hs.push("Nagapor");
    }
    if (yatyotema(bm, bd)) {
      hs.push("Yatyotema");
    }
    if (mahayatkyan(bm, bd)) {
      hs.push("Mahayatkyan");
    }
    if (shanyat(bm, bd)) {
      hs.push("Shanyat");
    }
  }

  // src/bcal/astro-days/bd.ts
  function sabbath(bd, lm) {
    const a = ["", "Sabbath", "Sabbath Eve"];
    let s = 0;
    if (bd === 8 || bd === 15 || bd === 23 || bd === lm) s = 1;
    if (bd === 7 || bd === 14 || bd === 22 || bd === lm - 1) s = 2;
    return a[s];
  }
  function nagahle(bm) {
    const a = ["West", "North", "East", "South"];
    let m1 = bm;
    if (bm <= 0) m1 = 4;
    const b = Math.floor(m1 % 12 / 3);
    return a[b];
  }
  function mahabote(by, wd) {
    const a = [
      "Binga",
      "Ahtun",
      "Yaza",
      "Adipati",
      "Marana",
      "Thike",
      "Puti"
    ];
    const b = (by - wd) % 7;
    return a[b];
  }
  function natkhat(by) {
    const a = ["Ogre", "Elf", "Human"];
    const b = by % 3;
    return a[b];
  }

  // src/bcal/astro-days/yp.ts
  function yatyaza(bm, wd) {
    const a = ["", "Yatyaza"];
    const m1 = bm % 4;
    let y = 0;
    const wd1 = Math.floor(m1 / 2) + 4;
    const wd2 = (1 - Math.floor(m1 / 2) + m1 % 2) * (1 + 2 * (m1 % 2));
    if (wd === wd1 || wd === wd2) y = 1;
    return a[y];
  }
  function pyathada(bm, wd) {
    const a = ["", "Pyathada", "Afternoon Pyathada"];
    const m1 = bm % 4;
    let p = 0;
    const wda = [1, 3, 3, 0, 2, 1, 2];
    if (m1 === 0 && wd === 4) p = 2;
    if (m1 === wda[wd]) p = 1;
    return a[p];
  }
  function yp(bm, wd) {
    const y = yatyaza(bm, wd);
    const p = pyathada(bm, wd);
    let r = "";
    if (p === "" && y === "") {
      r = "";
    } else if (y !== "" && p !== "") {
      r = [y, p];
    } else if (y === "" && p !== "") {
      r = p;
    } else if (y !== "" && p === "") {
      r = y;
    }
    return r;
  }

  // src/bcal/astro-days/index.ts
  function astroDays({ by, bm, ml, bd, wd }) {
    const asd = (hs) => astro(bm, bd, wd, hs);
    const ypy = yp(bm, wd);
    const sbd = sabbath(bd, ml);
    const ngl = nagahle(bm);
    const mhb = mahabote(by, wd);
    const nkt = natkhat(by);
    return {
      asd,
      ypy,
      sbd,
      ngl,
      mhb,
      nkt
    };
  }

  // src/bcal/list.ts
  var BurmeseMonthName = [
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
    "Late Kason"
  ];
  var MoonPhase = [
    "Waxing",
    "Full Moon",
    "Waning",
    "New Moon"
  ];
  var MONTHS = [
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
    "December"
  ];
  var MONTH_SHORT = MONTHS.map((i) => i.split("").slice(0, 3).join(""));
  var WEEK_DAYS = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];
  var WEEK_DAYS_SHORT = WEEK_DAYS.map(
    (i) => i.split("").slice(0, 3).join("")
  );

  // src/bcal/exceptions/fme.ts
  var FME = [
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
    [767, -1]
  ];
  function searchFme(by) {
    const found = FME.find((i) => i[0] === by);
    let result = 0;
    if (found !== void 0) {
      result = found[1];
    }
    return result;
  }

  // src/bcal/bcc/constants.ts
  var SY = 1577917828 / 432e4;
  var LM = 1577917828 / 53433336;
  var MO = 1954168050623e-6;
  var validYear = (by) => {
    const is4 = by.toString().split("").length <= 4;
    return by >= 0 && Number.isInteger(by) && is4;
  };
  var by2ky = (by) => {
    if (!validYear(by)) {
      throw new Error("Invalid Burmese Year");
    }
    return by + 3739;
  };
  var eraId = (by) => {
    if (!validYear(by)) {
      throw new Error("Invalid Burmese Year");
    }
    let id = 1.1;
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
  var getWoNm = (by) => {
    const eraConfigurations = {
      3: { WO: -0.5, NM: 8 },
      2: { WO: -1, NM: 4 },
      1.3: { WO: -0.85, NM: -1 },
      1.2: { WO: -1.1, NM: -1 },
      1.1: { WO: -1.1, NM: -1 }
    };
    const id = eraId(by);
    return {
      WO: eraConfigurations[id].WO + searchFme(by),
      NM: eraConfigurations[id].NM
    };
  };
  var getTaTw = (by) => {
    const { NM } = getWoNm(by);
    return {
      TA: (12 - NM) * (SY / 12 - LM),
      TW: LM - NM * (SY / 12 - LM)
    };
  };
  var excessDays = (by) => {
    const edays = SY * by2ky(by) % LM;
    return edays < getTaTw(by).TA ? edays + LM : edays;
  };
  var newYearTime = (by) => {
    return SY * by + MO;
  };

  // src/bcal/exceptions/wte.ts
  var WTE = {
    one: [1201, 1263, 1344],
    zero: [1202, 1264, 1345]
  };

  // src/bcal/bcc/leap-year.ts
  var checkWarhtat = (by) => {
    const ed = excessDays(by);
    const { TW } = getTaTw(by);
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
  var searchWasoFullMoon = (by) => {
    return Math.round(
      newYearTime(by) - excessDays(by) + 4.5 * LM + getWoNm(by).WO
    );
  };
  var getLeapYearData = (by) => {
    const a = checkWarhtat(by);
    const b1 = searchWasoFullMoon(by);
    let c = 0;
    let L = 0;
    let bs = 0;
    for (let i = 1; i < 4; i++) {
      bs = searchWasoFullMoon(by - i);
      c = checkWarhtat(by - i);
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

  // src/bcal/bcc/j2b.ts
  var monthLength = (yt, bm) => {
    let ml = 30 - bm % 2;
    if (bm === 3) {
      ml += Math.floor(yt / 2);
    }
    return ml;
  };
  var j2b = (jdn) => {
    const j = Math.round(jdn);
    const by = Math.floor((j - 0.5 - MO) / SY);
    const yc = getLeapYearData(by);
    let dd = j - yc.tg1 + 1;
    const b = Math.floor(yc.myt / 2);
    const c = Math.floor(1 / (yc.myt + 1));
    const myl = 354 + (1 - c) * 30 + b;
    const bmt = Math.floor((dd - 1) / myl);
    dd -= bmt * myl;
    const a = Math.floor((dd + 423) / 512);
    let bm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
    const e = Math.floor((bm + 12) / 16);
    const f = Math.floor((bm + 11) / 16);
    const bd = dd - Math.floor(29.544 * bm - 29.26) - b * e + c * f * 30;
    bm += f * 3 - e * 4 + 12 * bmt;
    const yt = yc.myt;
    const bml = monthLength(yt, bm);
    const mp = Math.floor((bd + 1) / 16) + Math.floor(bd / 16) + Math.floor(bd / bml);
    const fd = bd - 15 * Math.floor(bd / 16);
    const ssy = by + 1182;
    const wd = (jdn + 2) % 7;
    const bm_str = BurmeseMonthName[bm];
    const mp_str = MoonPhase[mp];
    return { yt, ssy, by, bm, bd, fd, mp, bml, bmt, wd, bm_str, mp_str };
  };

  // src/bcal/exceptions/eid.ts
  var eidDays = [
    //2020
    2459063
  ];
  function eid_day(jdn, hs) {
    if (eidDays.includes(jdn)) {
      hs.push("Eid al-Adha");
    }
  }

  // src/bcal/exceptions/holiday.ts
  function substituteHoliday(jdn, hs) {
    const holiday = [
      // 2019
      2458768,
      2458772,
      2458785,
      2458800,
      // 2020
      2458855,
      2458918,
      2458950,
      2459051,
      2459062,
      2459152,
      2459156,
      2459167,
      2459181,
      2459184,
      // 2021
      2459300,
      2459303,
      2459323,
      2459324,
      2459335,
      2459548,
      2459573
    ];
    if (holiday.includes(jdn)) {
      hs.push("Holiday");
    }
  }

  // src/bcal/holidays/burma.ts
  function bmHolidays(by, bm, bd, mp, hs) {
    if (bm === 2 && mp === 1) {
      hs.push("Buddha Day");
    } else if (bm === 4 && mp === 1) {
      hs.push("Beginning of Buddhist Lent");
    } else if (bm === 7 && mp === 1) {
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

  // src/bcal/holidays/gholidays.ts
  function gregorianHolidays(year, month, day, hs) {
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

  // src/bcal/holidays/thingyan.ts
  function thingyanHolidays(jdn, by, bmt, hs) {
    const SY2 = 1577917828 / 432e4;
    const MO2 = 1954168050623e-6;
    const BGNTG = 1100;
    const SE3 = 1312;
    const atat = SY2 * (by + bmt) + MO2;
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
      } else if (by + bmt >= 1369 && by + bmt < 1379 && (jdn === akyaNay - 2 || jdn >= atatNay + 2 && jdn <= akyaNay + 7)) {
        hs.push("Holiday");
      } else if (by + bmt >= 1384 && by + bmt <= 1385 && (jdn === akyaNay - 5 || jdn === akyaNay - 4 || jdn === akyaNay - 3 || jdn === akyaNay - 2)) {
        hs.push("Holiday");
      } else if (by + bmt >= 1386 && jdn >= atatNay + 2 && jdn <= akyaNay + 7) {
        hs.push("Holiday");
      }
    }
  }

  // src/bcal/holidays/index.ts
  function holidays({
    jdn,
    year,
    month,
    day,
    mp,
    bmt,
    by,
    bm,
    bd,
    hs
  }) {
    gregorianHolidays(year, month, day, hs);
    substituteHoliday(jdn, hs);
    thingyanHolidays(jdn, by, bmt, hs);
    bmHolidays(by, bm, bd, mp, hs);
    eid_day(jdn, hs);
  }

  // src/bcal/langs.ts
  var langs = [
    ["Sunday", "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031"],
    ["Monday", "\u1010\u1014\u1004\u103A\u1039\u101C\u102C"],
    ["Tuesday", "\u1021\u1004\u103A\u1039\u1002\u102B"],
    ["Wednesday", "\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038"],
    ["Thursday", "\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038"],
    ["Friday", "\u101E\u1031\u102C\u1000\u103C\u102C"],
    ["Saturday", "\u1005\u1014\u1031"],
    //
    ["January", "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E"],
    ["February", "\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E"],
    ["March", "\u1019\u1010\u103A"],
    ["April", "\u1027\u1015\u103C\u102E"],
    ["May", "\u1019\u1031"],
    ["June", "\u1007\u103D\u1014\u103A"],
    ["July", "\u1007\u1030\u101C\u102D\u102F\u1004\u103A"],
    ["August", "\u1029\u1002\u102F\u1010\u103A"],
    ["September", "\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C"],
    ["October", "\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C"],
    ["November", "\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C"],
    ["December", "\u1012\u102E\u1007\u1004\u103A\u1018\u102C"],
    //
    ["Tagu", "\u1010\u1014\u103A\u1001\u1030\u1038"],
    ["Kason", "\u1000\u1006\u102F\u1014\u103A"],
    ["Nayon", "\u1014\u101A\u102F\u1014\u103A"],
    ["Waso", "\u101D\u102B\u1006\u102D\u102F"],
    ["Wagaung", "\u101D\u102B\u1001\u1031\u102B\u1004\u103A"],
    ["Tawthalin", "\u1010\u1031\u102C\u103A\u101E\u101C\u1004\u103A\u1038"],
    ["Thadingyut", "\u101E\u102E\u1010\u1004\u103A\u1038\u1000\u103B\u103D\u1010\u103A"],
    ["Tazaungmon", "\u1010\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u102F\u1014\u103A\u1038"],
    ["Nadaw", "\u1014\u1010\u103A\u1010\u1031\u102C\u103A"],
    ["Pyatho", "\u1015\u103C\u102C\u101E\u102D\u102F"],
    ["Tabodwe", "\u1010\u1015\u102D\u102F\u1037\u1010\u103D\u1032"],
    ["Tabaung", "\u1010\u1015\u1031\u102B\u1004\u103A\u1038"],
    ["First Waso", "\u1015-\u101D\u102B\u1006\u102D\u102F"],
    ["Late Tagu", "\u1014\u103E\u1031\u102C\u1004\u103A\u1038\u1010\u1014\u103A\u1001\u1030\u1038"],
    ["Late Kason", "\u1014\u103E\u1031\u102C\u1004\u103A\u1038\u1000\u1006\u102F\u1014\u103A"],
    //
    ["Waxing", "\u101C\u1006\u1014\u103A\u1038"],
    ["Waning", "\u101C\u1006\u102F\u1010\u103A"],
    ["Full Moon", "\u101C\u1015\u103C\u100A\u103A\u1037"],
    ["New Moon", "\u101C\u1000\u103D\u101A\u103A"],
    //
    ["East", "\u1021\u101B\u103E\u1031\u1037"],
    ["West", "\u1021\u1014\u1031\u102C\u1000\u103A"],
    ["South", "\u1010\u1031\u102C\u1004\u103A"],
    ["North", "\u1019\u103C\u1031\u102C\u1000\u103A"],
    //
    ["Binga", "\u1018\u1004\u103A\u1039\u1002"],
    ["Atun", "\u1021\u1011\u103D\u1014\u103A\u1038"],
    ["Yaza", "\u101B\u102C\u1007"],
    ["Adipati", "\u1021\u1013\u102D\u1015\u1010\u102D"],
    ["Marana", "\u1019\u101B\u100F"],
    ["Thike", "\u101E\u102D\u102F\u1000\u103A"],
    ["Puti", "\u1015\u102F\u1010\u102D"],
    //
    ["Amyeittasote", "\u1021\u1019\u103C\u102D\u1010\u1039\u1010\u1005\u102F\u1010\u103A"],
    ["Warameittugyi", "\u101D\u102B\u101B\u1019\u102D\u1010\u1039\u1010\u102F\u1000\u103C\u102E\u1038"],
    ["Warameittunge", "\u101D\u102B\u101B\u1019\u102D\u1010\u1039\u1010\u102F\u1004\u101A\u103A"],
    ["Thamaphyu", "\u101E\u1019\u102C\u1038\u1016\u103C\u1030"],
    ["Thamanyo", "\u101E\u1019\u102C\u1038\u100A\u102D\u102F"],
    ["Yatpote", "\u101B\u1000\u103A\u1015\u102F\u1015\u103A"],
    ["Yatyotema", "\u101B\u1000\u103A\u101A\u102F\u1010\u103A\u1019\u102C"],
    ["Mahayatkyan", "\u1019\u101F\u102C\u101B\u1000\u103A\u1000\u103C\u1019\u103A\u1038"],
    ["Nagapor", "\u1014\u1002\u102B\u1038\u1015\u1031\u102B\u103A"],
    ["Shanyat", "\u101B\u103E\u1019\u103A\u1038\u101B\u1000\u103A"],
    //
    ["Ogre", "\u1018\u102E\u101C\u1030\u1038"],
    ["Elf", "\u1014\u1010\u103A"],
    ["Human", "\u101C\u1030"],
    //
    ["Sabbath Eve", "\u1021\u1016\u102D\u1010\u103A"],
    ["Sabbath", "\u1025\u1015\u102F\u101E\u103A"],
    //
    ["Yatyaza", "\u101B\u1000\u103A\u101B\u102C\u1007\u102C"],
    ["Pyathada", "\u1015\u103C\u103F\u1012\u102B\u1038"],
    ["Afternoon Pyathada", "\u1019\u103D\u1014\u103A\u1038\u101C\u103D\u1032\u1015\u103C\u103F\u1012\u102B\u1038"],
    //
    ["Independence Day", "\u101C\u103D\u1010\u103A\u101C\u1015\u103A\u101B\u1031\u1038\u1014\u1031\u1037"],
    ["Union Day", "\u1015\u103C\u100A\u103A\u1011\u1031\u102C\u1004\u103A\u1005\u102F\u1014\u1031\u1037"],
    ["Peasants' Day", "\u1010\u1031\u102C\u1004\u103A\u101E\u1030\u101C\u101A\u103A\u101E\u1019\u102C\u1038\u1014\u1031\u1037"],
    ["Labour Day", "\u1021\u101C\u102F\u1015\u103A\u101E\u1019\u102C\u1038\u1014\u1031\u1037"],
    ["Martyrs' Day", "\u1021\u102C\u1007\u102C\u1014\u100A\u103A\u1014\u1031\u1037"],
    ["Holiday", "\u101B\u102F\u1036\u1038\u1015\u102D\u1010\u103A\u101B\u1000\u103A"],
    ["Armed Forces Day", "\u1010\u1015\u103A\u1019\u1010\u1031\u102C\u103A\u1014\u1031\u1037"],
    ["New Year's Day", "\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038\u101B\u102F\u1036\u1038\u1015\u102D\u1010\u103A\u101B\u1000\u103A"],
    ["Christmas", "\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1014\u1031\u1037"],
    //
    ["Burmese New Year's Day", "\u1014\u103E\u1005\u103A\u1006\u1014\u103A\u1038"],
    ["Thingyan Atat", "\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1010\u1000\u103A\u1014\u1031\u1037"],
    ["Thingyan Akyat", "\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1000\u103C\u1010\u103A\u1014\u1031\u1037"],
    ["Thingyan Akya", "\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1000\u103B\u1014\u1031\u1037"],
    ["Thingyan Akyo", "\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1000\u103C\u102D\u102F\u1014\u1031\u1037"],
    //
    ["Eid al-Adha", "\u1021\u102D\u1012\u103A\u1014\u1031\u1037"],
    ["Deepavali", "\u1012\u102E\u101D\u102B\u101C\u102E"],
    //
    ["Buddha Day", "\u1017\u102F\u1012\u1039\u1013\u1014\u1031\u1037"],
    ["Beginning of Buddhist Lent", "\u1013\u1019\u1039\u1019\u1005\u1000\u103C\u102C\u1014\u1031\u1037"],
    ["End of Buddhist Lent", "\u101E\u102E\u1010\u1004\u103A\u1038\u1000\u103B\u103D\u1010\u103A\u1019\u102E\u1038\u1011\u103D\u1014\u103A\u1038\u1015\u103D\u1032"],
    ["Tazaungdaing", "\u1010\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1010\u102D\u102F\u1004\u103A"],
    ["National Day", "\u1021\u1019\u103B\u102D\u102F\u1038\u101E\u102C\u1038\u1014\u1031\u1037"],
    ["Karen New Year's Day", "\u1000\u101B\u1004\u103A\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038"],
    ["Tabaung Pwe", "\u1010\u1015\u1031\u102B\u1004\u103A\u1038\u1015\u103D\u1032"]
  ];

  // src/timezones/index.ts
  function get_offset(timeZone) {
    const now = /* @__PURE__ */ new Date();
    const tzString = now.toLocaleString("en-US", { timeZone });
    const localString = now.toLocaleString("en-US");
    const diff = (Date.parse(localString) - Date.parse(tzString)) / 36e5;
    const offset = diff + now.getTimezoneOffset() / 60;
    return -offset;
  }

  // src/utils/index.ts
  var utils = {
    SG: 2361222,
    UNIX: 24405875e-1,
    secularDiff(year) {
      return Math.floor(year / 100) - Math.floor(year / 400) - 2;
    },
    isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    monthsDaysArray(year) {
      const ms = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const ml = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return utils.isLeapYear(year) ? ml : ms;
    },
    uniqNumber(obj) {
      return Array.from(new Set(obj));
    },
    uniqString(obj) {
      return Array.from(new Set(obj));
    },
    Tnum(a, lang) {
      const l = lang ?? "English";
      const b = ["\u1040", "\u1041", "\u1042", "\u1043", "\u1044", "\u1045", "\u1046", "\u1047", "\u1048", "\u1049"];
      let r;
      if (l === "English") {
        r = a;
      } else {
        const aa = a.toString().split("");
        const bb = [];
        aa.map((i) => {
          const x = b[Number.parseInt(i)];
          bb.push(x);
        });
        r = bb.join("");
      }
      return r;
    },
    Tstr(str, array, lang) {
      const l = lang ?? "English";
      let r = "";
      if (l === "English") {
        r = str;
      } else {
        if (Array.isArray(str)) {
          const y = [];
          str.map((i) => {
            const z = array.filter((k) => k[0] === i);
            y.push(z[0][1]);
          });
          r = y;
        } else {
          const x = array.find((i) => i[0] === str);
          r = x ? x[1] : "";
        }
      }
      return r;
    },
    des2hms(des) {
      const a = Math.floor(des);
      const b = des - a;
      const c = b * 24;
      const hour = Math.floor(c);
      const d = (c - hour) * 60;
      const minute = Math.floor(d);
      const e = (d - minute) * 60;
      const second = Math.floor(e);
      return { hour, minute, second };
    },
    hms2des(hour, minute, second) {
      return hour / 24 + minute / 1440 + second / 86400;
    }
  };

  // src/gregorian-julian/index.ts
  function gregorianToJulian({
    year,
    month,
    day,
    hour,
    minute,
    second,
    timeZone,
    calendarType
  }) {
    const h = hour ?? 12;
    const m = minute ?? 0;
    const s = second ?? 0;
    const ctt = calendarType ?? "Gregorian";
    const tzz = timeZone ?? "GMT";
    const tz = get_offset(tzz);
    const d = utils.secularDiff(year);
    const df = (h - 12) / 24 + m / 1440 + s / 86400;
    const dftz = tz / 24;
    const a = Math.floor((month - 3) / 12);
    const x4 = year + a;
    const x3 = Math.floor(x4 / 100);
    const x2 = x4 % 100;
    const x1 = month - 12 * a - 3;
    const _jdn = Math.floor(146097 * x3 / 4) + Math.floor(36525 * x2 / 100) + Math.floor((153 * x1 + 2) / 5) + day + 1721119;
    const _jd = _jdn + df + dftz;
    const jd = ctt === "Julian" || ctt === "British" && _jd < utils.SG ? _jd + d : _jd;
    const jdn = Math.round(jd);
    return {
      jd,
      jdn
    };
  }
  var gregorian_julian_default = gregorianToJulian;

  // src/index.ts
  var BurmeseCalendar = class {
    _lang = "English";
    _tz = "Asia/Yangon";
    _ct = "Gregorian";
    _year = (/* @__PURE__ */ new Date()).getFullYear();
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
        month_views: []
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
          date_views: []
        };
        for (let j = 1; j <= days_in_month; j++) {
          const _month = i + 1;
          const jdn = gregorian_julian_default({
            year: this._year,
            month: _month,
            day: j,
            timeZone: this._tz,
            calendarType: this._ct
          }).jdn;
          const bcal = j2b(jdn);
          const astro2 = astroDays({
            by: bcal.by,
            bm: bcal.bm,
            ml: bcal.bml,
            bd: bcal.bd,
            wd: bcal.wd
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
            hs: hld_array
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
            weekday_long: utils.Tstr(
              WEEK_DAYS[bcal.wd],
              langs,
              this._lang
            ),
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
              public_holiday: utils.Tstr(
                hld_array,
                langs,
                this._lang
              )
            }
          };
          month_object.date_views.push(date_object);
        }
        const msa = utils.uniqString(bm_str);
        month_object.burmese_months = [...msa];
        month_object.sasana_years = typeof _ssy === "string" ? utils.uniqString(ssy_str) : utils.uniqNumber(ssy_num);
        month_object.burmese_years = typeof _by === "string" ? utils.uniqString(by_str) : utils.uniqNumber(by_num);
        year_object.month_views.push(month_object);
      }
      year_object.sasana_years = typeof _ssy === "string" ? utils.uniqString(ssy_str) : utils.uniqNumber(ssy_num);
      year_object.burmese_years = typeof _by === "string" ? utils.uniqString(by_str) : utils.uniqNumber(by_num);
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
    dateView({
      year,
      month,
      date,
      lang = "English"
    }) {
      this._year = year;
      this._month = month;
      this._date = date;
      this._lang = lang;
      return this.cal().month_views[month - 1].date_views[date];
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
    monthView({
      year,
      month,
      lang = "English"
    }) {
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
  var index_default = BurmeseCalendar;
})();
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
