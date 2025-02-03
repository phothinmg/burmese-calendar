var utils = {
  SG: 2361222,
  UNIX: 24405875e-1,
  secularDiff(year) {
    return Math.floor(year / 100) - Math.floor(year / 400) - 2;
  },
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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
    const b = [
      "\u1040",
      "\u1041",
      "\u1042",
      "\u1043",
      "\u1044",
      "\u1045",
      "\u1046",
      "\u1047",
      "\u1048",
      "\u1049",
    ];
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
  },
};
