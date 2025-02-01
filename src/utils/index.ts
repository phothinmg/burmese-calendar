export type Language = "English" | "Burmese";
export type Utils = {
	SG: number;
	UNIX: number;
	secularDiff(year: number): number;
	isLeapYear(year: number): boolean;
	monthsDaysArray(year: number): number[];
	uniqNumber(obj: number[]): number[];
	uniqString(obj: string[]): string[];
	Tnum(a: number, lang?: Language): string | number;
	Tstr(
		str: string | string[],
		array: string[][],
		lang?: Language,
	): string | string[];
	des2hms(des: number): {
		hour: number;
		minute: number;
		second: number;
	};
	hms2des(hour: number, minute: number, second: number): number;
};

export const utils: Utils = {
	SG: 2361222,
	UNIX: 2440587.5,

	secularDiff(year: number): number {
		return Math.floor(year / 100) - Math.floor(year / 400) - 2;
	},
	isLeapYear(year: number): boolean {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	},
	monthsDaysArray(year: number): number[] {
		const ms: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const ml: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return utils.isLeapYear(year) ? ml : ms;
	},
	uniqNumber(obj: number[]): number[] {
		return Array.from(new Set(obj));
	},
	uniqString(obj: string[]): string[] {
		return Array.from(new Set(obj));
	},
	Tnum(a: number, lang?: Language): string | number {
		const l: Language = lang ?? "English";
		const b: string[] = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
		let r: number | string;
		if (l === "English") {
			r = a;
		} else {
			const aa: string[] = a.toString().split("");
			const bb: string[] = [];
			aa.map((i) => {
				const x: string = b[Number.parseInt(i)];
				bb.push(x);
			});
			r = bb.join("");
		}
		return r;
	},
	Tstr(str: string | string[], array: string[][], lang?: Language) {
		const l: Language = lang ?? "English";
		let r: string | string[] = "";
		if (l === "English") {
			r = str;
		} else {
			if (Array.isArray(str)) {
				const y: string[] = [];
				str.map((i) => {
					const z = array.filter((k) => k[0] === i);
					y.push(z[0][1]);
				});
				r = y;
			} else {
				const x = array.find((i) => i[0] === str);
				r = x ? x[1] : "";
			}
		}
		return r;
	},
	des2hms(des: number): {
		hour: number;
		minute: number;
		second: number;
	} {
		const a = Math.floor(des);
		const b = des - a;
		const c = b * 24;
		const hour: number = Math.floor(c);
		const d = (c - hour) * 60;
		const minute = Math.floor(d);
		const e = (d - minute) * 60;
		const second = Math.floor(e);
		return { hour, minute, second };
	},
	hms2des(hour: number, minute: number, second: number): number {
		return hour / 24 + minute / 1440 + second / 86400;
	},
};
