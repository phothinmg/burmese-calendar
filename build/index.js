#!/usr/bin/env node
import $ from "dax-sh";
import { existsSync } from "node:fs";
import { writeFile, readFile, mkdir, mkdtemp } from "node:fs/promises";
import UglifyJS from "uglify-js";
import cleanDirectory from "./clean.js";
// output directories
const npmout = "dist";
const bout = "cdn";
// source files
const _index = "./src/index.ts";
const _tztype = "./src/tztype.ts";
// temp files
const temp1 = await mkdtemp("_f");
const temp2 = await mkdtemp("_s");
const temp3 = await mkdtemp("_t");
await $.sleep(1000);
async function createTemps() {
  await mkdir(`${temp3}/esm`, { recursive: true });
  await mkdir(`${temp3}/cjs`, { recursive: true });
  await mkdir(`${temp3}/b`, { recursive: true });
}
const tempts = `${temp1}/index.ts`;
//
await createTemps();
//
const esmindex = `${temp3}/esm/index.js`;
const cjsindex = `${temp3}/cjs/index.js`;
const bindex = `${temp3}/b/index.js`;
// tsconfig files
const esmconfig = `${temp2}/esmconfig.json`;
const esmtxt = `
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "../${temp3}/esm",
    "declaration": true,
    "declarationDir": "../${npmout}",
    "moduleResolution": "node"
  },
  "include": ["../${tempts}"],
  "exclude": ["node_modules/**/*"]
}
`;
const cjsconfig = `${temp2}/cjsconfig.json`;
const cjstxt = `
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "../${temp3}/cjs"
  },
  "include":  ["../${tempts}"],
  "exclude": ["node_modules/**/*"]
}
`;
const bconfig = `${temp2}/bconfig.json`;
const btxt = `
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir":  "../${temp3}/b",
    "moduleResolution": "node",
    "removeComments": true
  },
  "include": ["../${tempts}"],
  "exclude": ["node_modules/**/*"]
}
`;
// number of lines to remove
const lines = 1;
// merge files
async function mergeFile() {
  const indexcode = await readFile(_index, "utf8");
  const tztypecode = await readFile(_tztype, "utf8");
  const _code = indexcode.split("\n").slice(lines).join("\n");
  const txt = `
  ${tztypecode}
  ${_code}
  `;
  await writeFile(tempts, txt.trim());
}

async function createTsconfig() {
  await writeFile(esmconfig, esmtxt);
  await writeFile(cjsconfig, cjstxt);
  await writeFile(bconfig, btxt);
}

async function createEsm() {
  const code = await readFile(esmindex, "utf8");
  const result = UglifyJS.minify(code, { sourceMap: true });
  const txt = `
  ${result.code}
  //# sourceMappingURL=index.js.map
  `;
  await writeFile(`${npmout}/index.js`, txt.trim());
  if (result.map) {
    await writeFile(`${npmout}/index.js.map`, result.map);
  }
}
async function createCjs() {
  const code = await readFile(cjsindex, "utf8");
  const result = UglifyJS.minify(code, { sourceMap: true });
  const txt = `
    ${result.code}
    //# sourceMappingURL=index.cjs.map
    `;
  await writeFile(`${npmout}/index.cjs`, txt.trim());
  if (result.map) {
    await writeFile(`${npmout}/index.cjs.map`, result.map);
  }
}
async function createBcal() {
  const code = await readFile(bindex, "utf8");
  const _lines = code.replace(/export\s+/g, "").split("\n");
  const _code = _lines.join("\n");
  const result = UglifyJS.minify(_code, { sourceMap: true });
  const txt = `
      ${result.code}
      //# sourceMappingURL=bcal.js.map
      `;
  await writeFile(`${bout}/bcal.js`, txt.trim());
  if (result.map) {
    await writeFile(`${bout}/bcal.js.map`, result.map);
  }
}

// start build process
await $.sleep(500);
if (existsSync(npmout)) {
  await cleanDirectory(npmout);
} else {
  await mkdir(npmout);
}
if (existsSync(bout)) {
  await cleanDirectory(bout);
}
await $.sleep(3000);
await mkdir(bout);

await $.sleep(1000);
await mergeFile();
await $.sleep(1000);
await createTsconfig();
await $.sleep(5000);
await $`tsc --project ${esmconfig}`;
await $.sleep(1000);
await $`tsc --project ${cjsconfig}`;
await $.sleep(1000);
await $`tsc --project ${bconfig}`;
await $.sleep(2000);
await createEsm();
await $.sleep(1000);
await createCjs();
await $.sleep(1000);
await createBcal();

// remove temp dirs
await $.sleep(3000);
await $`rm -r ${temp1}`;
await $.sleep(1000);
await $`rm -r ${temp2}`;
await $.sleep(1000);
await $`rm -r ${temp3}`;
