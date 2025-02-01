/* cspell:disable */
/**
 * **Get Thingyan Holidays**
 * @param jdn Julian Day Number
 * @param by Burmese Calendar Year
 * @param bmt Burmese Month Type
 * @param hs String array to collect holidays
 */
export function thingyanHolidays(
	jdn: number,
	by: number,
	bmt: number,
	hs: string[],
) {
	//solar year (365.2587565)
	const SY: number = 1577917828.0 / 4320000.0;
	//beginning of 0 ME
	const MO: number = 1954168.050623;
	//start of Thingyan
	const BGNTG: number = 1100;
	//third era
	const SE3: number = 1312;
	const atat = SY * (by + bmt) + MO;
	let atar = 0;
	if (by >= SE3) {
		atar = atat - 2.169918982;
	} else {
		atar = atat - 2.1675;
	}
	const akyaNay = Math.floor(atar);
	const atatNay = Math.floor(atat);
	if (jdn === atatNay + 1) {
		hs.push("Burmese New Year's Day");
	}
	if (by + bmt >= BGNTG) {
		if (jdn === atatNay) {
			hs.push("Thingyan Atat");
		} else if (jdn > akyaNay && jdn < atatNay) {
			hs.push("Thingyan Akyat");
		} else if (jdn === akyaNay) {
			hs.push("Thingyan Akya");
		} else if (jdn === akyaNay - 1) {
			hs.push("Thingyan Akyo");
			//conditional add thingyan holidays
		} else if (
			by + bmt >= 1369 &&
			by + bmt < 1379 &&
			(jdn === akyaNay - 2 || (jdn >= atatNay + 2 && jdn <= akyaNay + 7))
		) {
			hs.push("Holiday");
		} else if (
			by + bmt >= 1384 &&
			by + bmt <= 1385 &&
			(jdn === akyaNay - 5 ||
				jdn === akyaNay - 4 ||
				jdn === akyaNay - 3 ||
				jdn === akyaNay - 2)
		) {
			hs.push("Holiday");
		} else if (by + bmt >= 1386 && jdn >= atatNay + 2 && jdn <= akyaNay + 7) {
			hs.push("Holiday");
		}
	}
}
