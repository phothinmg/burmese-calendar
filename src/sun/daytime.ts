import type { TimeZones } from "../timezones/tztype";
import { sun } from "./sun";
/**
 * Calculate the absolute difference between two times given as decimal hours.
 *
 * @param {number} decimalTime1 - The first time given as decimal hours.
 * @param {number} decimalTime2 - The second time given as decimal hours.
 * @return {string} A string in the format HH:MM:SS representing the absolute
 *   difference between the two times.
 */
const timeDiff = (decimalTime1: number, decimalTime2: number): string => {
	const seconds1 = Math.floor(decimalTime1 * 3600);
	const seconds2 = Math.floor(decimalTime2 * 3600);
	const diffSeconds = Math.abs(seconds1 - seconds2);
	const decimalDiff = diffSeconds / 3600;
	const hours = Math.floor(decimalDiff);
	const minutes = Math.floor((decimalDiff - hours) * 60);
	const seconds = Math.floor(((decimalDiff - hours) * 60 - minutes) * 60);
	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = seconds.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Converts a decimal time (hours plus fractional hours) to a string in the
 * 12-hour format HH:MM:SS AM/PM.
 *
 * @param {number} decimalTime - The decimal time to convert.
 * @return {string} A string in the format HH:MM:SS AM/PM.
 */
const convertDecimalTime = (decimalTime: number): string => {
	const hours = Math.floor(decimalTime);
	const minutes = Math.floor((decimalTime - hours) * 60);
	const seconds = Math.floor(((decimalTime - hours) * 60 - minutes) * 60);
	let formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = seconds.toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	if (hours > 12) {
		formattedHours = (hours - 12).toString().padStart(2, "0");
	} else if (hours === 0) {
		formattedHours = "12";
	}
	return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
};

/**
 * Calculate the sunrise, sunset, and daytime duration for a given location.
 *
 * This function determines the local times of sunrise and sunset based on
 * the provided latitude, longitude, and optional timezone. It also calculates
 * the duration of daylight between sunrise and sunset.
 *
 * @param latitude - The latitude of the location in degrees.
 * @param longitude - The longitude of the location in degrees.
 * @param timezone - Optional. The timezone identifier. Defaults to "GMT".
 * @returns An object containing:
 *          - sunrise: The local time of sunrise in "HH:MM:SS AM/PM" format.
 *          - sunset: The local time of sunset in "HH:MM:SS AM/PM" format.
 *          - daytime: The duration between sunrise and sunset in "HH:MM:SS" format.
 *          If the sun does not rise or set on that day, "N/A" is returned for the respective value.
 */

export const getDayTime = (
	latitude: number,
	longitude: number,
	timezone?: TimeZones,
) => {
	const [localRise, localSet] = sun(latitude, longitude, timezone);
	let sunrise = "N/A";
	let sunset = "N/A";
	let daytime = "N/A";
	if (localRise !== null && localSet !== null) {
		sunrise = convertDecimalTime(localRise);
		sunset = convertDecimalTime(localSet);
		daytime = timeDiff(localRise, localSet);
	}
	return {
		sunrise,
		sunset,
		daytime,
	};
};
