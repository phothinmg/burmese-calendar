// ## 1
function thamanyo(bm, wd) {
  const bmt = Math.floor(bm / 13);
  let bm1 = (bm % 13) + bmt;
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
  if (mf === wda[wd] || mf === wdb[wd] || (mf === 4 && wd === 5)) {
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

function yatyotema(bm, bd) {
  let bm1 = bm % 13 || 13;
  if (bm1 <= 0) bm1 = 4;
  const mf = bd - 15 * Math.floor(bd / 16);
  const m1 = bm1 % 2 ? bm1 : (bm1 + 9) % 12;
  const adjustedM1 = ((m1 + 4) % 12) + 1;
  const yatyotema2 = mf === adjustedM1 ? 1 : 0;
  return yatyotema2;
}
function mahayatkyan(bm, bd) {
  let bm1 = bm;
  if (bm1 <= 0) bm1 = 4;
  const mf = bd - 15 * Math.floor(bd / 16);
  let mahayatkyan2 = 0;
  const m1 = ((Math.floor((bm1 % 12) / 2) + 4) % 6) + 1;
  if (mf === m1) mahayatkyan2 = 1;
  return mahayatkyan2;
}
function shanyat(bm, bd) {
  const bmt = Math.floor(bm / 13);
  let bm1 = (bm % 13) + bmt;
  if (bm1 <= 0) bm1 = 4;
  const mf = bd - 15 * Math.floor(bd / 16);
  const sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
  const shanyat2 = mf === sya[bm1 - 1] ? 1 : 0;
  return shanyat2;
}
// export
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
  const b = Math.floor((m1 % 12) / 3);
  return a[b];
}
function mahabote(by, wd) {
  const a = ["Binga", "Ahtun", "Yaza", "Adipati", "Marana", "Thike", "Puti"];
  const b = (by - wd) % 7;
  return a[b];
}
function natkhat(by) {
  const a = ["Ogre", "Elf", "Human"];
  const b = by % 3;
  return a[b];
}
function yatyaza(bm, wd) {
  const a = ["", "Yatyaza"];
  const m1 = bm % 4;
  let y = 0;
  const wd1 = Math.floor(m1 / 2) + 4;
  const wd2 = (1 - Math.floor(m1 / 2) + (m1 % 2)) * (1 + 2 * (m1 % 2));
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
    nkt,
  };
}
