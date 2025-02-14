<div align="center">
<img src="https://github.com/phothinmg/burmese-calendar/blob/main/public/pk.jpg" width="100" height="100" alt="pk">
<h1>Burmese Calendar(Myanmar Calendar)</h1>
</div>

[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/burmese-calendar) [![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

## About

This package provides JavaScript objects focused on calendar views, Moon Phases calculations.

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

### API Docs at jsDocs.io

https://www.jsdocs.io/package/burmese-calendar

## Acknowledgement

### Burmese Calendar Calculation

The Algorithm for calculation of Burmese Calendar (Myanmar Calendar) by Dr. Yan Naing Aye.

Reference: https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

### Julian dates , Moon Phases , Moon Age Calculation

Algorithm from Meeus Astronomical Algorithms for computing dates of moon phases.

A collection of astronomy related programs, algorithms, tutorials, and data by Greg Miller (gmiller@gregmiller.net).

Reference: https://www.celestialprogramming.com/
