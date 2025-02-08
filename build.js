#!/usr/bin/env node
import { build } from "lwe8-build";
/** @import {BuildOptions} from "lwe8-build" */
/**
 * @type {BuildOptions}
 */
const options = {
  format: ["esm", "cjs", "browser"],
  outputDirs: {
    esm: "./dist",
    cjs: "./dist",
    browser: "./cdn",
  },
  indexFile: {
    path: "./src/index.ts",
    lines: 12,
  },
  otherFiles: [
    {
      path: "./src/tztype.ts",
    },
    {
      path: "./src/timezones.ts",
    },
    {
      path: "./src/views.ts",
    },
    {
      path: "./src/options.ts",
      lines: 3,
    },
    {
      path: "./src/ui-functions.ts",
    },
    {
      path: "./src/helpers.ts",
      removeExport: true,
    },
    {
      path: "./src/astrodays.ts",
      removeExport: true,
    },
    {
      path: "./src/holidays.ts",
      removeExport: true,
    },
    {
      path: "./src/bcal.ts",
      removeExport: true,
    },
    {
      path: "./src/translate.ts",
      removeExport: true,
    },
    {
      path: "./src/g2j.ts",
      lines: 1,
    },
  ],
};

await build(options);

/*
index - ./src/index.ts
  - line = 12
/* ---------------------------------------------------/
other files
  1. ./src/tztype.ts , line = null , !export = false
  2. ./src/timezones.ts , line = null , !export = false
  3. ./src/views.ts , line = null , !export = false
  4. ./src/options.ts , line = null , !export = false
  5. ./src/options.ts , line = 3 , !export = false
  6. ./src/helpers.ts , line = null , !export = true
  7. ./src/astrodays.ts , line = null , !export = true
  8. ./src/holidays.ts , line = null , !export = true
  9. ./src/bcal.ts , line = null , !export = true
  10. ./src/translate.ts , line = null , !export = true
  11. ./src/g2j.ts , line = 1 , !export = false

Total 12 files , re-export type Language at index
*/
