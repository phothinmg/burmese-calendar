(function () {
    const calEl = document.getElementById("calendar");
    const mv = document.createElement("div");
    const dv = document.createElement("div");
    const bcal = new Calendar();
    const dt = new Date();
    // ------------------------------------
    function showMonthView() {
      dv.style.setProperty("display", "none");
      mv.style.setProperty("display", "block");
    }
    function showDateView() {
      dv.style.setProperty("display", "block");
      mv.style.setProperty("display", "none");
    }
    // -------------------------------------
    /**
     * @type {string[]}
     */
    const months = bcal.MONTH_SHORT;
    /**
     * @type {number[]}
     */
    const years = numberRange(1900, 2100);
    /**
     * @type {string[]}
     */
    const wda = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // -----------------------------
    const topdiv = document.createElement("div");
    topdiv.classList.add("topdiv");
    // -----------------------
    const toph3 = document.createElement("h3");
    toph3.innerHTML = "Burmese Calendar";
    toph3.classList.add("toph3");
    toph3.innerHTML = "Burmese Calendar";
    // -----------------------
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
    const lselect = document.createElement("select");
    lselect.setAttribute("id", "langs");
    const opteng = document.createElement("option");
    opteng.value = "English";
    opteng.innerHTML = "English";
    opteng.selected = true;
    const optbur = document.createElement("option");
    optbur.value = "Burmese";
    optbur.innerHTML = "Burmese";
    lselect.appendChild(opteng);
    lselect.appendChild(optbur);
    // ---------------------------------------------
    const pvbtn = document.createElement("button");
    pvbtn.innerHTML = "&lt;";
    pvbtn.classList.add("tbtn");
    pvbtn.setAttribute("title", "Previous Month");
    const nextbtn = document.createElement("button");
    nextbtn.innerHTML = "&gt;";
    nextbtn.classList.add("tbtn");
    nextbtn.setAttribute("title", "Next Month");
    // ------------------------------------------------------------------
    topdiv.appendChild(toph3);
    topdiv.appendChild(pvbtn);
    topdiv.appendChild(yselect);
    topdiv.appendChild(mselect);
    topdiv.appendChild(lselect);
    topdiv.appendChild(nextbtn);

    // --------------------- Calendar Div --------------------------
    const calBody = document.createElement("div");
    calBody.classList.add("calendar-body");
    // ---- Week Days -----
    const wddiv = document.createElement("div");
    wddiv.classList.add("wddiv");
    wda.map((i) => {
      const wd = document.createElement("div");
      if (wda.indexOf(i) === 0 || wda.indexOf(i) === 6) {
        wd.classList.add("hd");
      }
      wd.classList.add("wd");
      wd.innerHTML = i;
      wddiv.appendChild(wd);
    });
    // ---- Days
    const daydiv = document.createElement("div");
    daydiv.classList.add("daydiv");
    const dayview = document.createElement("div");
    dayview.classList.add("dayview");
    const bbtn = document.createElement("button");
    bbtn.classList.add("backbtn");
    bbtn.innerHTML = "Back To Home";
    bbtn.addEventListener("click", showMonthView);
    function getValues() {
      return {
        yr: Number.parseInt(yselect.value),
        mo: Number.parseInt(mselect.value) + 1,
        lan: lselect.value,
      };
    }
    /**
     * Renders the month view according to the selected year, month, and language.
     * The rendered view consists of blank cells, days of the month, and Burmese calendar information.
     * Each day is clickable and will show a date view when clicked.
     */
    function render() {
      daydiv.innerHTML = "";
      const mView = bcal.monthView({
        year: getValues().yr,
        month: getValues().mo,
        lang: getValues().lan,
      });
      const dView = mView.date_views;
      const fwdid = dView[0].weekday.index;
      const dim = mView.month.days_in_month;
      // blank cells
      const { before, after } = blankCells(fwdid, dim);
      for (let i = 0; i < before; i++) {
        const blank = document.createElement("div");
        blank.classList.add("blank");
        daydiv.appendChild(blank);
      }
      for (let i = 0; i < dim; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        // === Date Div
        const datediv = document.createElement("div");
        datediv.classList.add("datediv");
        // ----------------------------------------------
        const datespan = document.createElement("span");
        const wdid = dView[i].weekday.index;
        if (wdid === 0 || wdid === 6 || dView[i].isHoliday) {
          datespan.classList.add("hd");
        }
        datespan.classList.add("datespan");
        datespan.innerHTML = dView[i].day.str;
        // -------------------------------------------
        const wdspan = document.createElement("span");
        wdspan.classList.add("wdspan");
        if (wdid === 0 || wdid === 6) {
          wdspan.classList.add("hd");
        }
        wdspan.innerHTML = dView[i].weekday.short;
        // --------------------------------------
        const sbhspan = document.createElement("span");
        sbhspan.classList.add("sbhspan");
        sbhspan.innerHTML = dView[i].burmese_cal.sabbath.str;
        // -------------------------------------
        datediv.appendChild(datespan);
        datediv.appendChild(sbhspan);
        datediv.appendChild(wdspan);
        // ==== BM Div
        const bmdiv = document.createElement("div");
        bmdiv.classList.add("bmdiv");
        const mpindex = dView[i].burmese_cal.moon_phase.index;
        const mmd =
          mpindex === 1
            ? "🟡"
            : mpindex === 3
            ? "🌑"
            : dView[i].burmese_cal.fortnight_day.str;
        const bmstr = `
        <span class="bmspan">${dView[i].burmese_cal.burmese_month.str}</span>
        <span class="bmspan">${dView[i].burmese_cal.moon_phase.str}<span class="fmspan">${mmd}</span></span>
        `;
        bmdiv.innerHTML = bmstr;
        // ------------------------------------
        const hld = document.createElement("p");
        hld.classList.add("holiday");
        hld.innerHTML = dView[i].burmese_cal.public_holiday.join(" , ");
        // ------------------------------------
        const shld = dView[i].burmese_cal.sabbath.school_holiday
          ? "School Holiday"
          : "";
        const _shld = document.createElement("p");
        _shld.classList.add("holiday");
        _shld.innerHTML = shld;
        // ----------------------------------
        day.dataset.jdn = dView[i].jdn;
        day.addEventListener("click", (e) => {
          dayview.innerHTML = "";
          const _div = document.createElement("div");
          const jdn = e.currentTarget.dataset.jdn;
          const d = dView.find((i) => i.jdn === Number(jdn));
          const dbd = d.burmese_cal;
          _div.innerHTML = `
          <h3 class="dv-h3">${d.year.str}-${d.month.long}-${d.day.str}</h3>
          <div class="dvtext">
            <span class="dvspan">JDN : ${d.jdn}</span>
            <span class="dvspan">Mahabote : ${dbd.mahabote.str}</span>
            <span class="dvspan">${dbd.astro_days.join(" , ")}</span>
          </div>
        `;
          dayview.appendChild(_div);
          dayview.appendChild(bbtn);
          showDateView();
        });

        // -----------------------------------
        day.appendChild(datediv);
        day.appendChild(bmdiv);
        day.appendChild(hld);
        day.appendChild(_shld);
        daydiv.appendChild(day);
      }
      for (let i = 0; i < after; i++) {
        const blank = document.createElement("div");
        blank.classList.add("blank");
        daydiv.appendChild(blank);
      }
      showMonthView();
    }
    // ----------------------------------------------------------
    calBody.appendChild(wddiv);
    calBody.appendChild(daydiv);
    // -------------------------------------------
    mv.appendChild(topdiv);
    mv.appendChild(calBody);
    dv.appendChild(dayview);
    // ---------------------------------------
    calEl.appendChild(mv);
    calEl.appendChild(dv);
    // ----------------------------------------
    render();
    topdiv.addEventListener("change", (e) => {
      e.preventDefault();
      render();
    });
    function preMonth() {
      let mval = Number.parseInt(mselect.value, 10);
      let yval = Number.parseInt(yselect.value, 10);
      mval = mval === 0 ? 11 : mval - 1;
      yval = mval === 11 ? yval - 1 : yval;
      mselect.value = mval;
      yselect.value = yval;
      render();
    }

    function nextMonth() {
      let mval = Number.parseInt(mselect.value, 10);
      let yval = Number.parseInt(yselect.value, 10);
      mval = mval === 11 ? 0 : mval + 1;
      yval = mval === 0 ? yval + 1 : yval;
      mselect.value = mval;
      yselect.value = yval;
      render();
    }
    pvbtn.addEventListener("click", preMonth);
    nextbtn.addEventListener("click", nextMonth);
  })();