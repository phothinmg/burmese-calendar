#!/usr/bin/env node

import $ from "dax-sh";
import { minify } from "lwe8-build";
import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";

const js_file = "./docs/index.js";
const js_content = readFileSync("./web/cal.js", "utf8");
const minified = minify(js_content, { keep_fnames: true }).code;

await (async () => {
  await $`npx @tailwindcss/cli -i ./web/cal.css -o ./docs/index.css --minify`;
  await $.sleep(1000);
  await writeFile(js_file, minified);
})();
