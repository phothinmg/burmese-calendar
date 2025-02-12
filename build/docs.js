#!/usr/bin/env node
import $ from "dax-sh";
import fs from "node:fs/promises";
import { minify } from "lwe8-build";

async function buidUiJs() {
  const code = await fs.readFile("./docs/calendar/cal.js", "utf8");
  const mini = minify(code, { sourceMap: true, keep_fnames: true });
  const txt = `
  ${mini.code}
  //# sourceMappingURL=bcal.js.map
  `;
  await fs.writeFile("./docs/calendar/bcal.js", txt.trim());
  await fs.writeFile("./docs/calendar/bcal.js.map", mini.map);
}
$.logStep("Start Building .....");
const start = performance.now();
await $.sleep(3000);
$.logStep("UIJs .....");
await buidUiJs();
const end = performance.now();
$.logStep(`Done in ${end - start} ms`);
