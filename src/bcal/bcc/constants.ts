import { searchFme } from "../exceptions/fme.js";
export type GetWoNm = {
	/**
	 * warhtat offset to compensate
	 */
	WO: number;
	/**
	 * Number of months to find excess days
	 */
	NM: number;
};
export type EraIds = 1.1 | 1.2 | 1.3 | 2 | 3;
/**
 * The length of a solar year in the Burmese calendar is defined as 1577917828/4320000 (365.2587565) days [Irwin, 1909].
 */
export const SY: number = 1577917828 / 4320000;
/**
 * The length of a lunar month in the Burmese calendar is defined as 1577917828/53433336 (29.53058795) days [Irwin, 1909].
 */
export const LM: number = 1577917828 / 53433336;
/**
 * Estimated Julian Date value of the starting time of the Burmese year zero [Yan Naing Aye,2013]
 */
export const MO: number = 1954168.050623;
/**
 * Checks if a given year is valid.
 * A valid year is a year that is non-negative,
 * an integer, and has a string representation of length 4 or less.
 * @param by The Burmese year to check
 * @returns If the year is valid
 */
export const validYear = (by: number): boolean => {
	const is4 = by.toString().split("").length <= 4;
	return by >= 0 && Number.isInteger(by) && is4;
};
/**
 * Burmese Year to Kali Yuga year
 * @param by Burmese year
 * @returns Kali Yuga year
 */
export const by2ky = (by: number): number => {
	if (!validYear(by)) {
		throw new Error("Invalid Burmese Year");
	}
	return by + 3739;
};
/**
 * Burmese Year to Sasana Year ( Buddhist Era - BE)
 * @param by Burmese Year
 * @returns Sasana Year
 */
export const by2ssy = (by: number): number => {
	if (!validYear(by)) {
		throw new Error("Invalid Burmese Year");
	}
	return by + 1182;
};
/**
 * Burmese calendar era id
 *
 * Era Ids
 *  - id = 3 : The third era (the era after Independence 1312 ME and after)
 *  - id = 2 : The second era (the era under British colony: 1217 ME - 1311 ME)
 *  - The first era (the era of Myanmar kings: ME1216 and before)
 *    - id = 1.3 : Thandeikta (ME 1100 - 1216)
 *    - id = 1.2 : Makaranta system 2 (ME 798 - 1099)
 *    - id = 1.1 : Makaranta system 1 (ME 0 - 797)
 * @param by Burmese Year
 */
export const eraId = (by: number) => {
	if (!validYear(by)) {
		throw new Error("Invalid Burmese Year");
	}
	let id: EraIds = 1.1;
	if (by >= 1312) {
		id = 3;
	} else if (by < 1312 && by >= 1217) {
		id = 2;
	} else if (by < 1217 && by >= 1100) {
		id = 1.3;
	} else if (by < 1100 && by >= 798) {
		id = 1.2;
	} else {
		id = 1.1;
	}
	return id;
};

/**
 * Get some Burmese year constants depending on era
 *
 * @param by Burmese year
 * @returns { WO: number; NM: number } - warhtat offset to compensate and number of months to find excess days
 */
export const getWoNm = (by: number): GetWoNm => {
	const eraConfigurations: Record<EraIds, GetWoNm> = {
		3: { WO: -0.5, NM: 8 },
		2: { WO: -1, NM: 4 },
		1.3: { WO: -0.85, NM: -1 },
		1.2: { WO: -1.1, NM: -1 },
		1.1: { WO: -1.1, NM: -1 },
	};
	// error handle already here
	const id: EraIds = eraId(by);
	return {
		WO: eraConfigurations[id].WO + searchFme(by),
		NM: eraConfigurations[id].NM,
	};
};
/**
 * ရက်ပိုညှိကိန်း TA ဝါထပ်ကိန်း TW
 *
 * TA =  The number of excess days for past 4 lunar month before the beginning of a Burmese year
 *
 * TW =  The threshold to determine whether the excess days exceeds {@link LM} within the next 8 months of a Burmese year.
 *
 * @param by Burmese Year
 *
 */
export const getTaTw = (by: number) => {
	// ရက်ပိုညှိကိန်း TA ဝါထပ်ကိန်း TW
	const { NM } = getWoNm(by);
	return {
		TA: (12 - NM) * (SY / 12 - LM),
		TW: LM - NM * (SY / 12 - LM),
	};
};
/**
 * The number of excess days of a Burmese year
 *
 * @param by Burmese Year
 */
export const excessDays = (by: number): number => {
	// ed =( SY ( my + 3739 ) ) mod LM
	const edays: number = (SY * by2ky(by)) % LM;
	/*
    if ed < TA then
    ed = ed + LM
    end if
     */
	return edays < getTaTw(by).TA ? edays + LM : edays;
};

/**
 * The Julian Day Number of the beginning of a Burmese year.
 * @param by Burmese year
 * @returns The Julian Day Number of the beginning of the given Burmese year.
 */
export const newYearTime = (by: number): number => {
	return SY * by + MO;
};
