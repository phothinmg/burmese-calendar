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

function holidays({ jdn, year, month, day, mp, bmt, by, bm, bd, hs }) {
  gregorianHolidays(year, month, day, hs);
  substituteHoliday(jdn, hs);
  thingyanHolidays(jdn, by, bmt, hs);
  bmHolidays(by, bm, bd, mp, hs);
  eid_day(jdn, hs);
}
