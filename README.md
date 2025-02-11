# Burmese Calendar(Myanmar Calendar)

## Acknowledgement

The Algorithm for calculation of Burmese Calendar (Myanmar Calendar) by Dr. Yan Naing Aye.

Reference: https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

## About

This package aims to coordinate and maintain the official holidays and leap years of the Myanmar(Burmese) calendar annually, starting from 2000, in line with those published by the government.

## Install

```bash
npm i burmese-calendar
```

```bash
pnpm i burmese-calendar
```
### For Browser

```html

```

## Use

```ts
// for calendar views
import { Calendar } from "burmese-calendar";

const cal = new Calendar();

console.log(cal.dateView({ year: 2025, month: 2, day: 12 }));
```
