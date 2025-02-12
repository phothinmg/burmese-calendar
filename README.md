# Burmese Calendar(Myanmar Calendar)

## Acknowledgement

The Algorithm for calculation of Burmese Calendar (Myanmar Calendar) by Dr. Yan Naing Aye.

Reference: https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

## About

This package provides JavaScript objects focused on calendar views.

## Install

```bash
npm i burmese-calendar
```

```bash
pnpm i burmese-calendar
```

### For Browser

```html
<script src="https://cdn.jsdelivr.net/gh/phothinmg/burmese-calendar@main/cdn/index.js"></script>
```

## Use

```ts
// for calendar views
import { Calendar } from "burmese-calendar";

const cal = new Calendar();

console.log(cal.dateView({ year: 2025, month: 2, day: 12 }));
```
