#!/usr/bin/env node
/** @import {BuildOptions} from "lwe8-build" */
import { build } from "lwe8-build";
import $ from "dax-sh";

$.logLight("Build for calendar");
await (async () => {
  /**
   * @type {BuildOptions}
   */
  const options = {
    format: ["esm", "cjs", "browser"],
    outputDirs: {
      esm: "./dist/cal",
      cjs: "./dist/cal",
      browser: "./cdn",
    },
    indexFile: {
      path: "./src/burmese-calendar/index.ts",
      lines: 13,
    },
    otherFiles: [
      // types files
      {
        path: "./src/timezones/tztype.ts",
      },
      {
        path: "./src/burmese-calendar/views.ts",
      },
      {
        path: "./src/burmese-calendar/options.ts",
        lines: 3,
      },
      {
        path: "./src/gregorian-julian/ct-type.ts",
      },
      // deps files
      {
        path: "./src/burmese-calendar/astrodays.ts",
        removeExport: true,
      },
      {
        path: "./src/burmese-calendar/holidays.ts",
        removeExport: true,
      },
      {
        path: "./src/burmese-calendar/bcal.ts",
        removeExport: true,
      },
      {
        path: "./src/burmese-calendar/translate.ts",
        removeExport: true,
      },
      {
        path: "./src/gregorian-julian/gregorianTojulian.ts",
        lines: 5,
        removeExport: true,
      },
      {
        path: "./src/gregorian-julian/secular-diff.ts",
        removeExport: true,
      },
      {
        path: "./src/helpers/index.ts",
        removeExport: true,
      },
      {
        path: "./src/timezones/index.ts",
        lines: 1,
        removeExport: true,
      },
    ],
  };

  await build(options);
})();
