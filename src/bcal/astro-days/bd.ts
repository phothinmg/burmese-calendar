/* cspell:disable */
export function sabbath(bd: number, lm: number): string {
	const a: string[] = ["", "Sabbath", "Sabbath Eve"];
	let s = 0;
	if (bd === 8 || bd === 15 || bd === 23 || bd === lm) s = 1;
	if (bd === 7 || bd === 14 || bd === 22 || bd === lm - 1) s = 2;
	return a[s];
}
export function nagahle(bm: number): string {
	const a: string[] = ["West", "North", "East", "South"];
	let m1: number = bm;
	if (bm <= 0) m1 = 4; //first warso is considered warso
	const b: number = Math.floor((m1 % 12) / 3);
	return a[b];
}
export function mahabote(by: number, wd: number): string {
	const a: string[] = [
		"Binga",
		"Ahtun",
		"Yaza",
		"Adipati",
		"Marana",
		"Thike",
		"Puti",
	];
	const b: number = (by - wd) % 7;
	return a[b];
}

export function natkhat(by: number): string {
	const a: string[] = ["Ogre", "Elf", "Human"];
	const b: number = by % 3;
	return a[b];
}
