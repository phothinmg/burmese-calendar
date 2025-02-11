/**
 * Determine if a given year is a leap year.
 * @param year The year to determine if it is a leap year.
 * @returns True if the year is a leap year, False otherwise.
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * Get the number of days in each month of a year, given the year.
 * @param year The year for which to get the number of days in each month.
 * @returns An array of length 12, where each element is the number of days in the corresponding month.
 */
export function monthsDaysArray(year: number): number[] {
	const ms: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const ml: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return isLeapYear(year) ? ml : ms;
}

/**
 * Removes duplicate numbers from an array.
 * @param obj An array of numbers.
 * @returns A new array containing only unique numbers from the input array.
 */
export function uniqNumber(obj: number[]): number[] {
	return Array.from(new Set(obj));
}
/**
 * Removes duplicate strings from an array.
 * @param obj An array of strings.
 * @returns A new array containing only unique strings from the input array.
 */
export function uniqString(obj: string[]): string[] {
	return Array.from(new Set(obj));
}
