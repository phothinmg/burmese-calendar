/* cspell:disable */
/**
 * Calculate Thamanyo
 * @param bm Burmese month
 * @param wd weekday id
 */
function thamanyo(bm: number, wd: number): number {
	const bmt: number = Math.floor(bm / 13);
	let bm1: number = (bm % 13) + bmt; // to 1-12 with month type
	if (bm1 <= 0) bm1 = 4; //first warso is considered warso (looks no need here)

	const m1: number = bm1 - 1 - Math.floor(bm1 / 9);
	const wd1: number = (m1 * 2 - Math.floor(m1 / 8)) % 7;
	const wd2: number = (wd + 7 - wd1) % 7;

	const thamanyo: number = wd2 <= 1 ? 1 : 0;

	return thamanyo;
}
/**
 * Calculate Thamaphyu
 * @param bd Burmese date [1-30]
 * @param wd weekday id
 */
function thamaphyu(bd: number, wd: number): number {
	const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
	let thamaphyu = 0;
	const wda = [1, 2, 6, 6, 5, 6, 7];
	const wdb = [0, 1, 0, 0, 0, 3, 3];

	if (mf === wda[wd] || mf === wdb[wd] || (mf === 4 && wd === 5)) {
		thamaphyu = 1;
	}

	return thamaphyu;
}
function amyeittasote(bd: number, wd: number): number {
	const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
	const wda: number[] = [5, 8, 3, 7, 2, 4, 1];
	return mf === wda[wd] ? 1 : 0;
}
function warameittugyi(bd: number, wd: number): number {
	const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
	const wda: number[] = [7, 1, 4, 8, 9, 6, 3];
	return mf === wda[wd] ? 1 : 0;
}
function warameittunge(bd: number, wd: number): number {
	const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
	const wn: number = (wd + 6) % 7;
	return 12 - mf === wn ? 1 : 0;
}
function yatpote(bd: number, wd: number): number {
	const mf: number = bd - 15 * Math.floor(bd / 16); //get fortnight day [0-15]
	const wda: number[] = [8, 1, 4, 6, 9, 8, 7];
	return mf === wda[wd] ? 1 : 0;
}
function nagapor(bd: number, wd: number): number {
	const wda = [26, 21, 2, 10, 18, 2, 21];
	const wdb = [17, 19, 1, 0, 9, 0, 0];

	if (
		bd === wda[wd] ||
		bd === wdb[wd] ||
		(bd === 2 && wd === 1) ||
		((bd === 12 || bd === 4 || bd === 18) && wd === 2)
	) {
		return 1;
	}

	return 0;
}
function yatyotema(bm: number, bd: number): number {
	let bm1 = bm % 13 || 13; // Normalize month to 1-12
	if (bm1 <= 0) bm1 = 4; // Consider first warso as warso
	const mf: number = bd - 15 * Math.floor(bd / 16); // Get fortnight day [0-15]
	const m1 = bm1 % 2 ? bm1 : (bm1 + 9) % 12;
	const adjustedM1 = ((m1 + 4) % 12) + 1;
	const yatyotema = mf === adjustedM1 ? 1 : 0;
	return yatyotema;
}
function mahayatkyan(bm: number, bd: number): number {
	let bm1: number = bm;
	if (bm1 <= 0) bm1 = 4; // Adjust month if less than or equal to 0
	const mf: number = bd - 15 * Math.floor(bd / 16); // Calculate fortnight day [0-15]
	let mahayatkyan = 0;
	const m1 = ((Math.floor((bm1 % 12) / 2) + 4) % 6) + 1;
	if (mf === m1) mahayatkyan = 1;
	return mahayatkyan;
}
function shanyat(bm: number, bd: number): number {
	const bmt = Math.floor(bm / 13);
	let bm1 = (bm % 13) + bmt; // Adjust month to 1-12 range
	if (bm1 <= 0) bm1 = 4; // Consider first warso as warso
	const mf: number = bd - 15 * Math.floor(bd / 16); // Get day within a fortnight [0-15]
	const sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
	const shanyat = mf === sya[bm1 - 1] ? 1 : 0;
	return shanyat;
}
export function astro(bm: number, bd: number, wd: number, hs: string[]): void {
	if (thamanyo(bm, wd)) {
		hs.push("Thamanyo");
	}
	if (amyeittasote(bd, wd)) {
		hs.push("Amyeittasote");
	}
	if (warameittugyi(bd, wd)) {
		hs.push("Warameittugyi");
	}
	if (warameittunge(bd, wd)) {
		hs.push("Warameittunge");
	}
	if (yatpote(bd, wd)) {
		hs.push("Yatpote");
	}
	if (thamaphyu(bd, wd)) {
		hs.push("Thamaphyu");
	}
	if (nagapor(bd, wd)) {
		hs.push("Nagapor");
	}
	if (yatyotema(bm, bd)) {
		hs.push("Yatyotema");
	}
	if (mahayatkyan(bm, bd)) {
		hs.push("Mahayatkyan");
	}
	if (shanyat(bm, bd)) {
		hs.push("Shanyat");
	}
}
