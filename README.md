<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Peacock_symbol_Burma.svg" width="100" height="100" alt="pk">
    <h2>Burmese Calendar(Myanmar Calendar)</h2>
</div>

[![GitHub License](https://img.shields.io/github/license/phothinmg/burmese-calendar)](https://github.com/phothinmg/burmese-calendar/blob/main/LICENSE)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/phothinmg/burmese-calendar/.github%2Fworkflows%2Fnpm-publish.yaml)
![NPM Version](https://img.shields.io/npm/v/burmese-calendar)


### Overview

Gregorian calendar to some Burmese calendar information.


---

### Acknowledgement

### Burmese Calendar

- The Algorithm for calculation of Burmese Calendar (Myanmar Calendar) and astrological calendar days by Dr. Yan Naing Aye.

- References: 

  https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

  https://cool-emerald.blogspot.com/2013/12/myanmar-astrological-calendar-days.html

### Julian Date and Moon Phases

- A collection of astronomy related programs, algorithms, tutorials, data and implementation of the algorithm from Meeus' Astronomical Algorithms for computing the dates of the phases of the Moon by Greg Miller (gmiller@gregmiller.net).

- Reference: https://www.celestialprogramming.com/

---

**Api docs :**  [https://www.jsdocs.io/package/burmese-calendar](https://www.jsdocs.io/package/burmese-calendar)

### Install

```bash
npm i burmese-calendar
```

```bash
yarn add burmese-calendar
```

```bash
pnpm add burmese-calendar
```

#### Browser

**jsDelivr :** [https://www.jsdelivr.com/package/npm/burmese-calendar](https://www.jsdelivr.com/package/npm/burmese-calendar)

```html
<script src="https://cdn.jsdelivr.net/npm/burmese-calendar/cdn/index.min.js"></script>
```

**Unpkg**

```html
<script src="https://unpkg.com/burmese-calendar/cdn/index.js"></script>
```

---





### Example Usage

```js

import { BurmeseCal } from "burmese-calendar"; // esm
const { BurmeseCal } = require("burmese-calendar"); //common js

// Date Time to jd and jdn
const julian = bcal.datetimeToJd({ year: 2025, month: 3, day: 6 ,hour:23,minutes:25,seconds:22}); // { jd: 2460741.475949074, jdn: 2460741 }

// Jd , JDN to Date Time
const dt = bcal.jdToDatetime( 2460741.475949074); //{ year: 2025, month: 3, day: 6, hour: 23, minutes: 25, seconds: 22 }
const dt2 = bcal.jdToDatetime(2460741); //{ year: 2025, month: 3, day: 6, hour: 12, minutes: 0, seconds: 0 }

// gregorian calendar date to julian calendar date
const toj = bcal.calendarConverter({
  ct: "julian",
  year: 2025,
  month: 3,
  day: 6,
}); // { year: 2025, month: 2, day: 21 }
// julian calendar date to gregorian calendar date
const tog = bcal.calendarConverter({
  ct: "gregorian",
  year: 2025,
  month: 3,
  day: 6,
}); // { year: 2025, month: 3, day: 19 }

// getting calendar views
const dv = bcal.dayView({ year: 2025, month: 3, day: 6 });
const mv = bcal.monthView({ year: 2025, month: 3 });
const yv = bcal.yearView({ year: 2025 });

```


    