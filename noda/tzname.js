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
const zones_file = "./src/calendar-ui/timezones.ts";
const type_file = "./src/timezones/tztype.ts";
// collect tz names
/** @type {string[]} */
const aa = [];
for (const zone of res.zones) {
  aa.push(zone.id);
  aa.push(...zone.aliases);
}
// make sure its string to join because of "/"
const zz = aa.map((i) => `"${i}"`);
//
const xx = [...zz];
const cc = zz.join(" | ");
const _aa = `export const timeZones = [${xx}]`;
const _bb = `export type TimeZones = ${cc}`;
// ---------------------------------
if (fs.existsSync(type_file)) {
  fs.unlinkSync(type_file);
}
if (fs.existsSync(zones_file)) {
  fs.unlinkSync(zones_file);
}
fs.writeFileSync(zones_file, _aa);
fs.writeFileSync(type_file, _bb);
