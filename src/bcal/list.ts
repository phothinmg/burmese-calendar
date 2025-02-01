/**
 * List of Myanmer month name
 */
export const BurmeseMonthName: string[] = [
	"First Waso",
	"Tagu",
	"Kason",
	"Nayon",
	"Waso",
	"Wagaung",
	"Tawthalin",
	"Thadingyut",
	"Tazaungmon",
	"Nadaw",
	"Pyatho",
	"Tabodwe",
	"Tabaung",
	"Late Tagu",
	"Late Kason",
];
/**
 * Moon Phases
 */
export const MoonPhase: string[] = [
	"Waxing",
	"Full Moon",
	"Waning",
	"New Moon",
];

/**
 * Name of Months
 */
export const MONTHS: string[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
/**
 * List of short month name
 */
export const MONTH_SHORT = MONTHS.map((i) => i.split("").slice(0, 3).join(""));
/**
 * Weekday Name
 */
export const WEEK_DAYS: string[] = [
	"Saturday",
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
];
/**
 * Weekday shorts
 */
export const WEEK_DAYS_SHORT = WEEK_DAYS.map((i) =>
	i.split("").slice(0, 3).join(""),
);
