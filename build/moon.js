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
    format: ["esm", "cjs"],
    outputDirs: {
      esm: "./dist/moon",
      cjs: "./dist/moon",
    },
    indexFile: {
      path: "./src/moon/index.ts",
      lines: 5,
    },
    otherFiles: [
      // types files
      {
        path: "./src/timezones/tztype.ts",
      },
      {
        path: "./src/moon/types.ts",
      },
      {
        path: "./src/gregorian-julian/ct-type.ts",
        removeExport: true,
      },
      // deps files
      {
        path: "./src/timezones/index.ts",
        lines: 1,
        removeExport: true,
      },

      {
        path: "./src/gregorian-julian/index.ts",
        lines: 5,
        removeExport: true,
      },
      {
        path: "./src/gregorian-julian/secular-diff.ts",
        removeExport: true,
      },
    ],
  };
  await build(options);
})();
