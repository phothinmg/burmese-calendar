/**
 *  **Get public holidays of Burma on Burmese Calendar's date**
 * @param by Burmese Calendar Year
 * @param bm Burmese Calendar Month
 * @param bd Burmese Calendar Day
 * @param mp Moon Phase
 * @param hs String array to collect holidays
 */
export function bmHolidays(
	by: number,
	bm: number,
	bd: number,
	mp: number,
	hs: string[],
): void {
	if (bm === 2 && mp === 1) {
		hs.push("Buddha Day");
	} //Vesak day
	else if (bm === 4 && mp === 1) {
		hs.push("Beginning of Buddhist Lent");
	} //Warso day
	else if (bm === 7 && mp === 1) {
		hs.push("End of Buddhist Lent");
	} else if (by >= 1379 && bm === 7 && (bd === 14 || bd === 16)) {
		hs.push("Holiday");
	} else if (bm === 8 && mp === 1) {
		hs.push("Tazaungdaing");
	} else if (by >= 1379 && bm === 8 && bd === 14) {
		hs.push("Holiday");
	} else if (by >= 1282 && bm === 8 && bd === 25) {
		hs.push("National Day");
	} else if (bm === 10 && bd === 1) {
		hs.push("Karen New Year's Day");
	} else if (bm === 12 && mp === 1) {
		hs.push("Tabaung Pwe");
	}
}
