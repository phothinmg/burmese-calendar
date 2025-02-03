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
    1.1: { WO: -1.1, NM: -1 },
  };
  const id = eraId(by);
  return {
    WO: eraConfigurations[id].WO + searchFme(by),
    NM: eraConfigurations[id].NM,
  };
};
var getTaTw = (by) => {
  const { NM } = getWoNm(by);
  return {
    TA: (12 - NM) * (SY / 12 - LM),
    TW: LM - NM * (SY / 12 - LM),
  };
};
var excessDays = (by) => {
  const edays = (SY * by2ky(by)) % LM;
  return edays < getTaTw(by).TA ? edays + LM : edays;
};
var newYearTime = (by) => {
  return SY * by + MO;
};
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

var monthLength = (yt, bm) => {
  let ml = 30 - (bm % 2);
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
  const mp =
    Math.floor((bd + 1) / 16) + Math.floor(bd / 16) + Math.floor(bd / bml);
  const fd = bd - 15 * Math.floor(bd / 16);
  const ssy = by + 1182;
  const wd = (jdn + 2) % 7;
  const bm_str = BurmeseMonthName[bm];
  const mp_str = MoonPhase[mp];
  return { yt, ssy, by, bm, bd, fd, mp, bml, bmt, wd, bm_str, mp_str };
};
