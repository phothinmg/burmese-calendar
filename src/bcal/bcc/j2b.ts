import { BurmeseMonthName, MoonPhase } from "../list.js";
import { MO, SY } from "./constants.js";
import { type GetLeapYearData, getLeapYearData } from "./leap-year.js";
export type JTB = {
	/**
	 * Burmese Year Types
	 * 0=common, 1=little warhtat, 2=big warhtat
	 */
	yt: number;
	/**
	 * Sasana Year
	 */
	ssy: number;
	/**
	 * Burmese Year
	 */
	by: number;
	/**
	 * Burmese Month
	 */
	bm: number;
	/**
	 * Burmese Month String
	 */
	bm_str: string;
	/**
	 * Burmese Month Type
	 */
	bmt: number;
	/**
	 * Burmese Month Length
	 */
	bml: number;
	/**
	 * Burmese Day
	 */
	bd: number;
	/**
	 * Fortnight Day
	 */
	fd: number;
	/**
	 * Week Day
	 */
	wd: number;
	/**
	 * Moon Phase
	 * [0=waxing, 1=full moon, 2=waning, 3=new moon]
	 */
	mp: number;
	/**
	 * Moon Phase String
	 */
	mp_str: string;
};
/**
 * Calculate the length of a month in the Burmese calendar.
 *
 * @param yt The type of the Burmese year.
 * @param bm The month in the Burmese calendar [0-14].
 * @returns The length of the month (30 for even months, 29 for odd months, with adjustments for "Nayon"=30 for "Big Warhtat").
 */
export const monthLength = (yt: number, bm: number) => {
	/* စုံ = ၃၀ မ = ၂၉ */
	let ml = 30 - (bm % 2);
	/*
ဝါကြီးထပ်နှစ်အတွက် နယုန်လတွင်တစ်ရက်ပေါင်း
29 + 1 = 30 days
*/
	if (bm === 3) {
		ml += Math.floor(yt / 2);
	}
	return ml;
};

/**
 * Julian Day Number to Burmese Calendar Date
 * @param jdn Julian Day Number
 */
export const j2b = (jdn: number): JTB => {
	const j: number = Math.round(jdn);
	// return
	const by: number = Math.floor((j - 0.5 - MO) / SY);
	const yc: GetLeapYearData = getLeapYearData(by);
	// ရက်အရေအတွက်
	let dd: number = j - yc.tg1 + 1;
	const b: number = Math.floor(yc.myt / 2);
	const c: number = Math.floor(1 / (yc.myt + 1));

	const myl: number = 354 + (1 - c) * 30 + b;
	// month type: late =1 or early = 0
	const bmt = Math.floor((dd - 1) / myl);
	dd -= bmt * myl;
	// adjust day count and threshold
	const a: number = Math.floor((dd + 423) / 512);
	let bm: number = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
	const e: number = Math.floor((bm + 12) / 16);
	const f: number = Math.floor((bm + 11) / 16);
	// return
	const bd: number = dd - Math.floor(29.544 * bm - 29.26) - b * e + c * f * 30;
	// adjust month numbers for late months
	// return
	bm += f * 3 - e * 4 + 12 * bmt;
	//return
	const yt: number = yc.myt;
	// ------------------------------------
	// length of Burmese month
	const bml = monthLength(yt, bm);
	// Moon Phase
	const mp =
		Math.floor((bd + 1) / 16) + Math.floor(bd / 16) + Math.floor(bd / bml);
	// fortnight day [1-15]
	const fd = bd - 15 * Math.floor(bd / 16);
	// Sasana Year ( Buddhist Era - BE)
	const ssy = by + 1182;
	// week days id
	const wd = (jdn + 2) % 7;
	// --- string
	const bm_str = BurmeseMonthName[bm];
	const mp_str = MoonPhase[mp];
	return { yt, ssy, by, bm, bd, fd, mp, bml, bmt, wd, bm_str, mp_str };
};
