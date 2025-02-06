#!/usr/bin/env node
import $ from "dax-sh";
import fs from "node:fs";
/**
 * @typedef Zone
 * @property {string} id
 * @property {string[]} aliases
 */
/**
 * @typedef Res
 * @property {Zone[]} zones
 */
const ianaVersion = "2025a";
// fetch data
/** @type {Res} */
const res = await $.request(
  `https://nodatime.org/TimeZones?version=${ianaVersion}&format=json`
).json();
//
const _file = "./src/tztype.ts";
// collect tz names
/** @type {string[]} */
const aa = [];
for (const zone of res.zones) {
  aa.push(zone.id);
  aa.push(...zone.aliases);
}
// make sure its string to join because of "/"
const zz = aa.map((i) => `"${i}"`);
const cc = zz.join(" | ");
const _bb = `export type TimeZones = ${cc}`;
// ---------------------------------
if (fs.existsSync(_file)) {
  fs.unlinkSync(_file);
}

fs.writeFileSync(_file, _bb);
