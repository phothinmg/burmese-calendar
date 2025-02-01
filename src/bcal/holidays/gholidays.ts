/**
 * **Get public holidays of Myanmar on Gregorian date**
 * @param year
 * @param month
 * @param day
 * @param hs String array to collect holidays
 */
export function gregorianHolidays(
	year: number,
	month: number,
	day: number,
	hs: string[],
): void {
	if (year >= 2018 && year <= 2021 && month === 1 && day === 1) {
		hs.push("New Year's Day");
	} else if (year >= 1948 && month === 1 && day === 4) {
		hs.push("Independence Day");
	} else if (year >= 1947 && month === 2 && day === 12) {
		hs.push("Union Day");
	} else if (year >= 1958 && month === 3 && day === 2) {
		hs.push("Peasants' Day");
	} else if (year >= 1945 && month === 3 && day === 27) {
		hs.push("Armed Forces Day");
	} else if (year >= 1923 && month === 5 && day === 1) {
		hs.push("Labour Day");
	} else if (year >= 1947 && month === 7 && day === 19) {
		hs.push("Martyrs' Day");
	} else if (year >= 1752 && month === 12 && day === 25) {
		hs.push("Christmas");
	} else if (year === 2017 && month === 12 && day === 30) {
		hs.push("Holiday");
	} else if (year >= 2017 && year <= 2021 && month === 12 && day === 31) {
		hs.push("Holiday");
	}
}
