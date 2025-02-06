import { Calendar, blankCellBefore } from "./src/index.js";
import fs from "node:fs";
const cal = new Calendar();

const mv = cal.monthView({ year: 2025, month: 2, lang: "Burmese" });

//fs.writeFileSync("aa.json", JSON.stringify(mv, null, 2));

console.log(blankCellBefore(3));
