<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Peacock_symbol_Burma.svg" width="100" height="100" alt="pk">
    <h2>Burmese Calendar(Myanmar Calendar)</h2>
</div>

[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/burmese-calendar)
[![GitHub License](https://img.shields.io/github/license/phothinmg/burmese-calendar)](https://github.com/phothinmg/burmese-calendar/blob/main/LICENSE)
![GitHub top language](https://img.shields.io/github/languages/top/phothinmg/burmese-calendar)
![NPM Last Update](https://img.shields.io/npm/last-update/burmese-calendar)


### Overview

Node.js native addon that provides Gregorian calendar to some Burmese calendar information.

Api docs at  https://www.jsdocs.io/package/burmese-calendar.

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

### Example Usage

```js
import bcal from "burmese-calendar"; // esm
const bcal = require("burmese-calendar"); //common js

// Date Time to jd and jdn
const toJulian = bcal.datetimeToJd(2025, 3, 6); // { jd: 2460740.5, jdn: 2460741 }

// Jd , JDN to Date Time
const dt = bcal.jdToDatetime(2460740.5); //{ year: 2025, month: 3, day: 6, hour: 0, minute: 0, second: 0 }
const dt = bcal.jdToDatetime(2460741); //{ year: 2025, month: 3, day: 6, hour: 12, minute: 0, second: 0 }

// gregorian calendar date to julian calendar date
const toj = bcal.calConverter(1, 2025, 3, 6);// { year: 2025, month: 2, day: 21 }
// julian calendar date to gregorian calendar date
const tog = bcal.calConverter(0, 2025, 3, 6);// { year: 2025, month: 3, day: 19 }

// getting calendar views
const dv = bcal.dayView(2025, 3, 6);
const mv = bcal.monthView(2025, 3);
const yv = bcal.yearView(2025);
```
    