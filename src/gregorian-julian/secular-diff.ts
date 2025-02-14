/**
 * Returns the secular difference between the Julian period and the Gregorian
 * period, given a year.
 * @param year The year for which to calculate the secular difference.
 * @returns The secular difference between the Julian period and the Gregorian
 * period, for the given year.
 */
export function secularDiff(year: number): number {
  return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}
