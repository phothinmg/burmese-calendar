import type { TimeZones } from "../tztype";
/**
 * phase - 0 = new, .25 = first quarter, .5 = full, .75 = last quarter, all other values are invalid
 */
type MoonPhases = 0 | 0.25 | 0.5 | 0.75;
type CalendarTypes = "British" | "Gregorian" | "Julian";
/**
 * Calculates the offset of the given time zone from the local time zone.
 * @param timeZone The time zone to calculate the offset for.
 * @returns The offset in hours between the given time zone and the local time zone.
 */
function get_offset(timeZone: TimeZones) {
	const now = new Date();
	const tzString = now.toLocaleString("en-US", { timeZone });
	const localString = now.toLocaleString("en-US");
	const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
	const offset = diff + now.getTimezoneOffset() / 60;

	return -offset;
}
function secularDiff(year: number): number {
	return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}

/**
 * Convert a Julian Date to a date and time in a specific time zone.
 * @param jd The Julian Date to convert.
 * @param tz The time zone offset in hours to use for the conversion. If not
 * provided, this defaults to GMT.
 * @returns An object with the following properties: year, month, day, hour,
 * minute, second.
 */
function jd2dt(
	jd: number,
	tz?: TimeZones,
): {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
} {
	const _tzz: TimeZones = tz ?? "GMT";
	const tzz = get_offset(_tzz);
	const jdd = jd + tzz / 24;
	// JDN to Year Month Date
	const jdn = Math.round(jdd);

	const a = 4 * jdn - 6884477;
	const x3 = Math.floor(a / 146097);
	const r3 = a % 146097;

	const b = 100 * Math.floor(r3 / 4) + 99;
	const x2 = Math.floor(b / 36525);
	const r2 = b % 36525;

	const c = 5 * Math.floor(r2 / 100) + 2;
	const x1 = Math.floor(c / 153);
	const r1 = c % 153;

	const cc = Math.floor((x1 + 2) / 12);
	const year = 100 * x3 + x2 + cc;
	const month = x1 - 12 * cc + 3;
	const day = Math.floor(r1 / 5) + 1;

	// decimal fraction of JD to Hour Minute Second
	const j = Math.floor(jdd);
	const fjdn = jdd - j;
	const xx1 =
		fjdn >= 0.5 ? (fjdn * 86400 - 43200) / 3600 : (fjdn * 86400 + 43200) / 3600;
	const hour = Math.floor(xx1);
	const xx2 = (xx1 - hour) * 3600;
	const xx3 = xx2 / 60;
	const minute = Math.floor(xx3);
	const second = Math.floor((xx3 - minute) * 60);
	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
	};
}
const _sg = 2361222;
/**
 * Convert a Julian Day to a date-time object.
 *
 * @param jd The Julian Day to convert.
 * @param tz The timezone offset in hours. Defaults to 0 (UTC).
 * @param ct The calendar type. Defaults to "Gregorian".
 * @returns An object with the following properties: year, month, date, hour, minute, second, and string.
 * The string property is a string representation of the date and time in the format "Month Day, Year Hour:Minute:Second".
 */
function jd2DateTime(
	jd: number,
	tz?: TimeZones,
	ct?: CalendarTypes,
): {
	year: number;
	month: number;
	date: number;
	hour: number;
	minute: number;
	second: number;
	string: string;
} {
	const tzz = tz ?? "GMT";
	const ctt = ct ?? "Gregorian";
	const ma: string[] = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const g = jd2dt(jd, tzz);
	const g2 = jd2dt(jd - secularDiff(g.year), tzz);
	const g3 = ctt === "Julian" || (ctt === "British" && jd < _sg) ? g2 : g;
	const mo = ma[g3.month - 1];
	const h = g3.hour.toString().length === 1 ? `0${g3.hour}` : `${g3.hour}`;
	const mi =
		g3.minute.toString().length === 1 ? `0${g3.minute}` : `${g3.minute}`;
	const s =
		g3.second.toString().length === 1 ? `0${g3.second}` : `${g3.second}`;
	const str: string = `${mo} ${g3.day} , ${g3.year} , ${h}:${mi}:${s}`;
	return {
		year: g3.year,
		month: g3.month,
		date: g3.day,
		hour: g3.hour,
		minute: g3.minute,
		second: g3.second,
		string: str,
	};
}

function mod360(f: number) {
	let t = f % 360;
	if (t < 0) t += 360;
	return t;
}
/**
 *   Year - integer year
    Month - integer month, January = 0
    
    Gets an estimate of the cycle number to be passed into getPhaseDate().  Since this
    is just an estimate, the user should also compute phase dates for cycles before and after
    the cycle number returned from this function
 * @param year 
 * @param month 
 * @returns 
 */
function getCycle(year: number, month: number) {
	const yf = (month * 30 + 15) / 365; //Estimate fraction of year
	const k = 12.3685 * (year + yf - 2000);
	return Math.floor(k);
}

/**
 *   
Greg Miller gmiller@gregmiller.net
Algorithm from Meeus Astronomical Algorithms for computing dates of moon phases
Released as public domain
www.celestialprogramming.com
    
 * @param {number} cycle - Cycle number from {@link getCycle}
 * @param {MoonPhases} phase - 0 = new, .25 = first quarter, .5 = full, .75 = last quarter
 * @returns {number} Julian Ephemeris Day of the phase
 */
function phaseDate(cycle: number, phase: MoonPhases): number {
	/*
    Gets the given phase within a given cycle number based on the year 2000.  Compute cycle
    estimate using getCycleEstimate() above.
    
    cycle - integer cycle number from getCycleEstimate()
    phase - 0 = new, .25 = first quarter, .5 = full, .75 = last quarter, all other values are invalid
    
    returns JD of specified phase in TDB time scale.
    */
	//From Meeus ch49
	const k = cycle + phase;

	const toRad = Math.PI / 180;

	const T = k / 1236.85; //49.3

	let JDE =
		2451550.09766 +
		29.530588861 * k +
		0.00015437 * T * T -
		0.00000015 * T * T * T +
		0.00000000073 * T * T * T * T; //49.1

	const E = 1 - 0.002516 * T - 0.0000074 * T * T; //47.6

	const M =
		mod360(
			2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T * T * T,
		) * toRad; //49.4
	const Mp =
		mod360(
			201.5643 +
				385.81693528 * k +
				0.0107582 * T * T +
				0.00001238 * T * T * T -
				0.000000058 * T * T * T * T,
		) * toRad; //49.5
	const F =
		mod360(
			160.7108 +
				390.67050284 * k -
				0.0016118 * T * T -
				0.00000227 * T * T * T +
				0.000000011 * T * T * T * T,
		) * toRad; //49.6
	const Om =
		mod360(
			124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T,
		) * toRad; //49.7
	//P351-352
	const A1 = mod360(299.77 + 0.107408 * k - 0.009173 * T * T) * toRad;
	const A2 = mod360(251.88 + 0.016321 * k) * toRad;
	const A3 = mod360(251.83 + 26.651886 * k) * toRad;
	const A4 = mod360(349.42 + 36.412478 * k) * toRad;
	const A5 = mod360(84.66 + 18.206239 * k) * toRad;
	const A6 = mod360(141.74 + 53.303771 * k) * toRad;
	const A7 = mod360(207.14 + 2.453732 * k) * toRad;
	const A8 = mod360(154.84 + 7.30686 * k) * toRad;
	const A9 = mod360(34.52 + 27.261239 * k) * toRad;
	const A10 = mod360(207.19 + 0.121824 * k) * toRad;
	const A11 = mod360(291.34 + 1.844379 * k) * toRad;
	const A12 = mod360(161.72 + 24.198154 * k) * toRad;
	const A13 = mod360(239.56 + 25.513099 * k) * toRad;
	const A14 = mod360(331.55 + 3.592518 * k) * toRad;

	let correction = 0;
	if (phase === 0) {
		correction =
			0.00002 * Math.sin(4 * Mp) +
			-0.00002 * Math.sin(3 * Mp + M) +
			-0.00002 * Math.sin(Mp - M - 2 * F) +
			0.00003 * Math.sin(Mp - M + 2 * F) +
			-0.00003 * Math.sin(Mp + M + 2 * F) +
			0.00003 * Math.sin(2 * Mp + 2 * F) +
			0.00003 * Math.sin(Mp + M - 2 * F) +
			0.00004 * Math.sin(3 * M) +
			0.00004 * Math.sin(2 * Mp - 2 * F) +
			-0.00007 * Math.sin(Mp + 2 * M) +
			-0.00017 * Math.sin(Om) +
			-0.00024 * E * Math.sin(2 * Mp - M) +
			0.00038 * E * Math.sin(M - 2 * F) +
			0.00042 * E * Math.sin(M + 2 * F) +
			-0.00042 * Math.sin(3 * Mp) +
			0.00056 * E * Math.sin(2 * Mp + M) +
			-0.00057 * Math.sin(Mp + 2 * F) +
			-0.00111 * Math.sin(Mp - 2 * F) +
			0.00208 * E * E * Math.sin(2 * M) +
			-0.00514 * E * Math.sin(Mp + M) +
			0.00739 * E * Math.sin(Mp - M) +
			0.01039 * Math.sin(2 * F) +
			0.01608 * Math.sin(2 * Mp) +
			0.17241 * E * Math.sin(M) +
			-0.4072 * Math.sin(Mp);
	} else if (phase === 0.25 || phase === 0.75) {
		correction =
			-0.00002 * Math.sin(3 * Mp + M) +
			0.00002 * Math.sin(Mp - M + 2 * F) +
			0.00002 * Math.sin(2 * Mp - 2 * F) +
			0.00003 * Math.sin(3 * M) +
			0.00003 * Math.sin(Mp + M - 2 * F) +
			0.00004 * Math.sin(Mp - 2 * M) +
			-0.00004 * Math.sin(Mp + M + 2 * F) +
			0.00004 * Math.sin(2 * Mp + 2 * F) +
			-0.00005 * Math.sin(Mp - M - 2 * F) +
			-0.00017 * Math.sin(Om) +
			0.00027 * E * Math.sin(2 * Mp + M) +
			-0.00028 * E * E * Math.sin(Mp + 2 * M) +
			0.00032 * E * Math.sin(M - 2 * F) +
			0.00032 * E * Math.sin(M + 2 * F) +
			-0.00034 * E * Math.sin(2 * Mp - M) +
			-0.0004 * Math.sin(3 * Mp) +
			-0.0007 * Math.sin(Mp + 2 * F) +
			-0.0018 * Math.sin(Mp - 2 * F) +
			0.00204 * E * E * Math.sin(2 * M) +
			0.00454 * E * Math.sin(Mp - M) +
			0.00804 * Math.sin(2 * F) +
			0.00862 * Math.sin(2 * Mp) +
			-0.01183 * E * Math.sin(Mp + M) +
			0.17172 * E * Math.sin(M) +
			-0.62801 * Math.sin(Mp);

		const W =
			0.00306 -
			0.00038 * E * Math.cos(M) +
			0.00026 * Math.cos(Mp) -
			0.00002 * Math.cos(Mp - M) +
			0.00002 * Math.cos(Mp + M) +
			0.00002 * Math.cos(2 * F);
		if (phase === 0.25) {
			correction += W;
		} else {
			correction -= W;
		}
	} else if (phase === 0.5) {
		correction =
			0.00002 * Math.sin(4 * Mp) +
			-0.00002 * Math.sin(3 * Mp + M) +
			-0.00002 * Math.sin(Mp - M - 2 * F) +
			0.00003 * Math.sin(Mp - M + 2 * F) +
			-0.00003 * Math.sin(Mp + M + 2 * F) +
			0.00003 * Math.sin(2 * Mp + 2 * F) +
			0.00003 * Math.sin(Mp + M - 2 * F) +
			0.00004 * Math.sin(3 * M) +
			0.00004 * Math.sin(2 * Mp - 2 * F) +
			-0.00007 * Math.sin(Mp + 2 * M) +
			-0.00017 * Math.sin(Om) +
			-0.00024 * E * Math.sin(2 * Mp - M) +
			0.00038 * E * Math.sin(M - 2 * F) +
			0.00042 * E * Math.sin(M + 2 * F) +
			-0.00042 * Math.sin(3 * Mp) +
			0.00056 * E * Math.sin(2 * Mp + M) +
			-0.00057 * Math.sin(Mp + 2 * F) +
			-0.00111 * Math.sin(Mp - 2 * F) +
			0.00209 * E * E * Math.sin(2 * M) +
			-0.00514 * E * Math.sin(Mp + M) +
			0.00734 * E * Math.sin(Mp - M) +
			0.01043 * Math.sin(2 * F) +
			0.01614 * Math.sin(2 * Mp) +
			0.17302 * E * Math.sin(M) +
			-0.40614 * Math.sin(Mp);
	}

	JDE += correction;

	//Additional corrections P 252
	correction =
		0.000325 * Math.sin(A1) +
		0.000165 * Math.sin(A2) +
		0.000164 * Math.sin(A3) +
		0.000126 * Math.sin(A4) +
		0.00011 * Math.sin(A5) +
		0.000062 * Math.sin(A6) +
		0.00006 * Math.sin(A7) +
		0.000056 * Math.sin(A8) +
		0.000047 * Math.sin(A9) +
		0.000042 * Math.sin(A10) +
		0.00004 * Math.sin(A11) +
		0.000037 * Math.sin(A12) +
		0.000035 * Math.sin(A13) +
		0.000023 * Math.sin(A14);

	JDE += correction;

	return JDE;
}

/**
 * Calculate the Julian Date of different moon phases for a given year and month.
 *
 * This function computes the Julian Date for the new moon, first quarter, full moon,
 * and last quarter phases of the moon for a specific year and month.
 *
 * @param year - The year for which the moon phases are calculated.
 * @param month - The month (0-indexed) for which the moon phases are calculated.
 * @returns An object containing the Julian Dates for the new moon, first quarter,
 *          full moon, and last quarter phases.
 */

function calMoonPhases(year: number, month: number) {
	const cy: number = getCycle(year, month);
	const _n: number = phaseDate(cy, 0);
	const _fst: number = phaseDate(cy, 0.25);
	const _ful: number = phaseDate(cy, 0.5);
	const _lst: number = phaseDate(cy, 0.75);
	return {
		newMoon: _n,
		firstQuarter: _fst,
		fullMoon: _ful,
		lastQuarter: _lst,
	};
}

/**
 * Compute the dates of full moon for the given year and timezone.
 *
 * @param year - The year to compute the full moon dates for.
 * @param tz - Optional timezone string. Defaults to "Asia/Yangon".
 * @returns An array of 12 strings, each representing the date of the full moon for each month of the year.
 */
function fullMoonDays(year: number, tz?: TimeZones): string[] {
	const ttz: TimeZones = tz ?? "Asia/Yangon";
	const ct: CalendarTypes = "Gregorian";
	const phases = new Array(12).fill(0).map((_, i) => calMoonPhases(year, i));
	return phases.map((p) => jd2DateTime(p.fullMoon, ttz, ct).string);
}
function utcTime(): {
	year: number;
	month: number;
	date: number;
	hour: number;
	minute: number;
	second: number;
} {
	const dt = new Date();
	const year = dt.getUTCFullYear();
	const month = dt.getUTCMonth();
	const date = dt.getUTCDate();
	const hour = dt.getUTCHours();
	const minute = dt.getUTCMinutes();
	const second = dt.getUTCSeconds();
	return { year, month, date, hour, minute, second };
}
function unix2jd(unix: number): number {
	return 2440587.5 + unix / 86400.0;
}
function jdutc(): number {
	const dt: Date = new Date();
	const unix: number = dt.getTime() / 1000;
	return unix2jd(unix);
}
/**
 * Return the moon age in days, length of month, previous and next new moon days in strings,
 * and the full moon day in string.
 * @param tz - Optional time zone. Defaults to "GMT".
 * @returns Object containing length of month, moon age, previous and next new moon days,
 * and the full moon day.
 */
function getMoonAge(tz?: TimeZones): {
	lengthOfMonth: number;
	moonAge: number;
	previousNewMoon: string;
	nextNewMoon: string;
	fullMoon: string;
} {
	const _tzz = tz ?? "GMT";
	// tz offset of this to fraction of day
	const df = get_offset(_tzz) / 24;
	// set time zone as GMT
	const y = utcTime().year;
	const rm = utcTime().month;
	// last and next month
	const pm = rm - 1;
	const nm = rm + 1;
	// sometime 2 new moon days in one month , store nm to an array
	// recent month NMs
	const rnms: number[] = [];
	rnms.push(calMoonPhases(y, rm).newMoon);
	// prev month NMs
	const pnms: number[] = [];
	pnms.push(calMoonPhases(y, pm).newMoon);
	// next month NMs
	const nnms: number[] = [];
	nnms.push(calMoonPhases(y, nm).newMoon);
	// set jd for now , utc + tz fraction of this

	const jdnow = jdutc() + df;
	// find previous and next new moon days as ,jd
	const nm1: number | undefined = rnms.find((i) => i < jdnow);
	const nm2: number | undefined = rnms.find((i) => i > jdnow);
	const nm3: number = pnms.length > 1 ? pnms[1] : pnms[0];
	const nm4: number = nnms[0];
	// previous
	const pn_m: number = nm1 ? nm1 : nm3;
	const p_n_m: number = pn_m + df;
	// next
	const nn_m: number = nm2 ? nm2 : nm4;
	const n_n_m: number = nn_m + df;
	//TODO length of month
	const l_m: number = n_n_m - p_n_m;
	// moon age now
	const man = jdnow - p_n_m;
	// find full moon
	const fma: number[] = [];
	for (let i = pm; i <= nm; i++) {
		fma.push(calMoonPhases(y, i).fullMoon + df);
	}
	let fm = 0;
	for (const f of fma) {
		if (f > p_n_m && f < n_n_m) {
			fm = f;
		}
	}
	// string of fm, pnm and nnm
	const fmStr = jd2DateTime(fm).string;
	const pnmStr = jd2DateTime(p_n_m).string;
	const nnmStr = jd2DateTime(n_n_m).string;
	//return { l_m, man, pnmStr, nnmStr, fmStr };
	return {
		lengthOfMonth: l_m,
		moonAge: man,
		previousNewMoon: pnmStr,
		nextNewMoon: nnmStr,
		fullMoon: fmStr,
	};
}

/**
 * Get string representations of moon phase dates for a given month and year.
 *
 * This function calculates the dates of the new moon, first quarter,
 * full moon, and last quarter for the specified year and month, and
 * returns them as formatted string representations.
 *
 * @param year - The year for which to calculate moon phases.
 * @param month - The month for which to calculate moon phases.
 * @returns An object containing the string representations of the
 * new moon, first quarter, full moon, and last quarter dates.
 */

function getMoonPhasesString(year: number, month: number) {
	const mps = calMoonPhases(year, month);
	return {
		newMoon: jd2DateTime(mps.newMoon).string,
		firstQuarter: jd2DateTime(mps.firstQuarter).string,
		fullMoon: jd2DateTime(mps.fullMoon).string,
		lastQuarter: jd2DateTime(mps.lastQuarter).string,
	};
}
/**
 * A more recent lunation number (called the Lunation Number) was introduced by Jean Meeus in 1998.
 * Lunation 0 as beginning on the first new moon of 2000 (this occurred at approximately 18:14 UTC, 6 January 2000).
 *
 * @param year - The year for which to calculate moon phases.
 * @param month - The month for which to calculate moon phases [0=Jan,...,11=Dec]
 * @returns - Meenus Lunation Number [LN]
 */
function meenusLn(year: number, month: number) {
	return getCycle(year, month);
}
/**
 * Brown Lunation Number (BLN) by Ernest William Brown.
 * Lunation 1 occurred at approximately 02:41 UTC, 17 January 1923.
 *
 * @param year - The year for which to calculate moon phases.
 * @param month  - The month for which to calculate moon phases [0=Jan,...,11=Dec]
 * @returns - Brown Lunation Number [BLN] [BLN = LN + 953]
 */
function brownLn(year: number, month: number) {
	return getCycle(year, month) + 953;
}
/**
 * The Thai Lunation Number is called "มาสเกณฑ์" (Maasa-Kendha),
 * defines lunation 0 as the beginning of Burmese era of the Buddhist calendar on Sunday, 22 March 638 CE.
 *
 * @param year - The year for which to calculate moon phases.
 * @param month  - The month for which to calculate moon phases [0=Jan,...,11=Dec]
 * @returns Thai Lunation Number [TLN] [TLN = LN + 16843]
 */
function thaiLn(year: number, month: number) {
	return getCycle(year, month) + 16843;
}

export type { TimeZones, CalendarTypes, MoonPhases };
export {
	brownLn,
	meenusLn,
	thaiLn,
	getMoonPhasesString,
	getMoonAge,
	fullMoonDays,
	calMoonPhases,
	get_offset,
	jd2dt,
	jd2DateTime,
};
