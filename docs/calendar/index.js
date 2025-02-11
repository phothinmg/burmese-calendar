const calEl = document.getElementById("calendar");
const bcal = new Calendar();
const dt = new Date();
// ------------------------------------

// -------------------------------------
/**
 * @type {string[]}
 */
const months = bcal.MONTH_SHORT;
/**
 * @type {number[]}
 */
const years = numberRange(1900, 2100);
// -----------------------------
const topdiv = document.createElement("div");
topdiv.classList.add("topdiv");
// -----------------------
const toph3 = document.createElement("h3");
toph3.innerHTML = "Burmese Calendar";
toph3.classList.add("toph3");
topdiv.appendChild(toph3);
// -----------------------
const ymdiv = document.createElement("div");
ymdiv.classList.add("ymdiv");
const yselect = document.createElement("select");
yselect.setAttribute("id", "year");
years.map((i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  if (i === dt.getFullYear()) {
    opt.selected = true;
  }
  yselect.appendChild(opt);
});
const mselect = document.createElement("select");
mselect.setAttribute("id", "month");
months.map((i) => {
  const opt = document.createElement("option");
  opt.value = months.indexOf(i);
  opt.innerHTML = i;
  if (months.indexOf(i) === dt.getMonth()) {
    opt.selected = true;
  }
  mselect.appendChild(opt);
});
const pvbtn = document.createElement("button");
pvbtn.innerHTML = "&lt;";
pvbtn.classList.add("tbtn");
const nextbtn = document.createElement("button");
nextbtn.innerHTML = "&gt;";
nextbtn.classList.add("tbtn");
function preMonth() {
  let mval = parseInt(mselect.value, 10);
  let yval = parseInt(yselect.value, 10);
  mval = mval === 0 ? 11 : mval - 1;
  yval = mval === 11 ? yval - 1 : yval;
  mselect.value = mval;
  yselect.value = yval;
}

function nextMonth() {
  let mval = parseInt(mselect.value, 10);
  let yval = parseInt(yselect.value, 10);
  mval = mval === 11 ? 0 : mval + 1;
  yval = mval === 0 ? yval + 1 : yval;
  mselect.value = mval;
  yselect.value = yval;
}
pvbtn.addEventListener("click", preMonth);
nextbtn.addEventListener("click", nextMonth);
// ------------------------------------------------------------------
ymdiv.appendChild(pvbtn);
ymdiv.appendChild(yselect);
ymdiv.appendChild(mselect);
ymdiv.appendChild(nextbtn);
// -----------------------
topdiv.appendChild(ymdiv);
// -------------------------------------------------
const calBody = document.createElement("div");
calBody.classList.add("calendar-body");
// ----------------------------------------------------------
calEl.appendChild(topdiv);
calEl.appendChild(calBody);
