var wda = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var moa = [
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
// ======================== Init Date Now =====================================//
var dt = new Date();
var year = dt.getFullYear();
var month = dt.getMonth();
// ==================== Init BurmeseCalendar =========================================//
var bcal = new BurmeseCalendar();
// ========================================================= Top Div ============================================//
var topdiv = document.getElementById("top");
//
var decbtn = document.getElementById("decbtn");
var nextbtn = document.getElementById("nextbtn");
// year
var selectyear = document.getElementById("year");
for (let i = 1900; i < 2100; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  if (i === year) {
    opt.selected = true;
  }
  selectyear.appendChild(opt);
}
// month select
var selectmonth = document.getElementById("month");
for (let i = 0; i < moa.length; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = moa[i];
  if (i === month) {
    opt.selected = true;
  }
  selectmonth.appendChild(opt);
}
// lang select
var selectlan = document.getElementById("lang");
var opteng = document.createElement("option");
opteng.value = "English";
opteng.innerHTML = "English";
var optbur = document.createElement("option");
optbur.value = "Burmese";
optbur.innerHTML = "Burmese";
selectlan.appendChild(opteng);
selectlan.appendChild(optbur);
// ================================
//==================================
function getValues() {
  return {
    yr: parseInt(selectyear.value),
    mo: parseInt(selectmonth.value) + 1,
    lan: selectlan.value,
  };
}
// ========================================== Calendar Body ===========================================================//
// main calendar body
var caldiv = document.getElementById("cal");
// weekday div
var wddiv = document.createElement("div");
wddiv.classList.add("wd-div");
for (let i = 0; i < wda.length; i++) {
  var wd = document.createElement("div");
  wd.classList.add("wd");
  if (i === 0 || i === 6) {
    wd.classList.add("sunday");
  }
  wd.innerHTML = wda[i];
  wddiv.appendChild(wd);
}
caldiv.appendChild(wddiv);
// div for day card
var dayDiv = document.createElement("div");
dayDiv.classList.add("day-div");

function render() {
  dayDiv.innerHTML = "";
  var mview = bcal.monthView({
    year: getValues().yr,
    month: getValues().mo,
    lang: getValues().lan,
  });
  var dview = mview.date_views;
  var fdid = dview[0].weekday_id;
  // blank cell at start
  var blankbefore = fdid % 7;
  // blank cell at end
  var _diff = blankbefore + dview.length;
  var blankafter = 0;
  if (_diff <= 35) {
    blankafter = 35 - _diff;
  } else if (_diff > 0 && _diff < 42) {
    blankafter = 42 - _diff;
  } else {
    blankafter = 0;
  }
  for (let i = 0; i < blankbefore; i++) {
    var blk = document.createElement("div");
    blk.classList.add("blank");
    dayDiv.appendChild(blk);
  }
  for (let i = 0; i < dview.length; i++) {
    var day = dview[i];
    var hld = "";
    if (day.weekday_id === 0 || day.weekday_id === 6 || day.isHoliday) {
      hld = "sunday";
    }
    var mmd = day.burmese_cal.fortnight_date;
    if (day.isFullMoon) {
      mmd = "🟡";
    } else if (day.isNewMoon) {
      mmd = "🌑";
    } else {
      mmd = day.burmese_cal.fortnight_date;
    }
    //--
    const _daview = document.getElementById("day-view");
    _daview.style.display = "none";
    var dadiv = document.createElement("div");
    dadiv.classList.add("day");
    var _btn = document.createElement("button");
    _btn.classList.add("back-btn");
    _btn.innerHTML = "Back";
    var da = `
      <p class="date-p">
      <span class="date-span ${hld}">${day.date}</span>
      <span class="sbh-span">${day.burmese_cal.sabbath}</span>
      <span class="wd-span ${hld}">${day.weekday_short}</span>
      </p>
      <p class="bm-p">
      <span class="bm-span">${day.burmese_cal.burmese_month}</span>
      <span class="bm-span">${
        day.burmese_cal.moon_phase
      }<span class="fm-span"> ${mmd}</span></span>
      </p>
      <p class="holiday">${day.burmese_cal.public_holiday.join("\n")}</p>
      <p class="bm-p">${day.burmese_cal.yatyaza_pyathada}</p>
  `;
    dadiv.innerHTML = da;
    dadiv.dataset.jdn = day.jdn;
    dadiv.addEventListener("click", (e) => {
      _daview.innerHTML = "";
      var _div = document.createElement("div");
      const jdn = e.currentTarget.dataset.jdn;
      const dview = mview.date_views.find((d) => d.jdn === Number(jdn));
      _div.innerHTML = `
      <h3>${dview.year}-${dview.month_long}-${dview.date}</h3>
      <p class="bm-p-d">JDN : ${dview.jdn}</p>
      <p class="bm-p-d">${dview.burmese_cal.burmese_month} ${
        dview.burmese_cal.moon_phase
      } ${mmd}</p>
      <p class="bm-sbh">${dview.burmese_cal.sabbath}</p>
      <p class="bm-p-d">${dview.burmese_cal.yatyaza_pyathada}</p>
      <p class="bm-p-d">${dview.burmese_cal.astro_days.join(" \n  ")}</p>
      `;
      _daview.appendChild(_div);
      _daview.appendChild(_btn);
      document.getElementById("month-view").style.display = "none";
      _daview.style.display = "block";
    });
    _btn.addEventListener("click", (e) => {
      _daview.style.display = "none";
      document.getElementById("month-view").style.display = "block";
    });
    dayDiv.appendChild(dadiv);
  }
  for (let i = 0; i < blankafter; i++) {
    var blk = document.createElement("div");
    blk.classList.add("blank");
    dayDiv.appendChild(blk);
  }
  caldiv.appendChild(dayDiv);
}
//
render();
topdiv.addEventListener("change", (e) => {
  e.preventDefault();
  render();
});
// ============================

function premonth() {
  var mval = parseInt(selectmonth.value);
  var yval = parseInt(selectyear.value);
  if (mval === 0) {
    selectmonth.value = 11;
    selectyear.value = yval - 1;
  } else {
    selectmonth.value = mval - 1;
  }

  render();
}
function nextmonth() {
  var mval = parseInt(selectmonth.value);
  var yval = parseInt(selectyear.value);
  if (mval === 11) {
    selectmonth.value = 0;
    selectyear.value = yval + 1;
  } else {
    selectmonth.value = mval + 1;
  }

  render();
}
decbtn.addEventListener("click", premonth);
nextbtn.addEventListener("click", nextmonth);
