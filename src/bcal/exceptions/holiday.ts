/**
 * **Substitute Holiday**
 * @param jdn Julian Day Number
 * @param hs String array to collect holidays
 */
export function substituteHoliday(jdn: number, hs: string[]) {
	const holiday = [
		// 2019
		2458768, 2458772, 2458785, 2458800,
		// 2020
		2458855, 2458918, 2458950, 2459051, 2459062, 2459152, 2459156, 2459167,
		2459181, 2459184,
		// 2021
		2459300, 2459303, 2459323, 2459324, 2459335, 2459548, 2459573,
	];
	if (holiday.includes(jdn)) {
		hs.push("Holiday");
	}
}
