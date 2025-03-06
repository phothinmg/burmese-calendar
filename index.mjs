import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const bcal = require("./index.js");

export default bcal;