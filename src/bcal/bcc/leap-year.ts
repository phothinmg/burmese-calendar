import { WTE } from "../exceptions/wte.js";
import { LM, excessDays, getTaTw, getWoNm, newYearTime } from "./constants.js";
// ---
export type GetLeapYearData = {
	/**
	 * Myanmar Year Type
	 *
	 * 0=common, 1=little warhtat, 2=big warhtat
	 *
	 */
	myt: number;
	/**
	 * The 1st day of Tagu as Julian Day Number for MMT
	 */
	tg1: number;
	/**
	 * Full moon day of [2nd] Warso as Julian Day Number
	 */
	fm: number;
	/**
	 * Warhtat discrepancy
	 *
	 * 0 = ok, 1= error
	 */
	err: number;
};
//--
/**
 * Checking a year for intercalary month or not
 * @param by Burmese Year
 * @returns 1=warhtat, 0=common
 */
const checkWarhtat = (by: number) => {
	const ed = excessDays(by);
	const { TW } = getTaTw(by);
	const myt = ed >= TW ? 1 : 0;
	let result = 0;
	if (WTE.zero.includes(by)) {
		result = 0;
	} else if (WTE.one.includes(by)) {
		result = 1;
	} else {
		result = myt;
	}
	return result;
};
/**
 * Full moon day of 2nd Warso
 * @param by Burmese Year
 * @returns Full moon day of 2nd Warso
 */
const searchWasoFullMoon = (by: number) => {
	return Math.round(
		newYearTime(by) - excessDays(by) + 4.5 * LM + getWoNm(by).WO,
	);
};

export const getLeapYearData = (by: number): GetLeapYearData => {
	const a = checkWarhtat(by);
	const b1 = searchWasoFullMoon(by);
	let c = 0;
	let L = 0;
	let bs = 0;
	for (let i = 1; i < 4; i++) {
		bs = searchWasoFullMoon(by - i);
		c = checkWarhtat(by - i);
		L = i;
		if (c === 1) {
			break;
		}
	}
	const b3 = (b1 - bs) % 354;
	const myt = a === 0 ? a : Math.floor(b3 / 31) + a;
	const fm = a === 1 ? b1 : bs + 354 * L;
	const err = a === 1 && b3 !== 31 && b3 !== 30 ? 1 : 0;
	const tg1 = bs + 354 * L - 102;
	return { myt, tg1, fm, err };
};
