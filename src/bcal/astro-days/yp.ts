/* cspell:disable */
function yatyaza(bm: number, wd: number): string {
	const a: string[] = ["", "Yatyaza"];
	const m1: number = bm % 4;
	let y = 0;
	const wd1: number = Math.floor(m1 / 2) + 4;
	const wd2: number = (1 - Math.floor(m1 / 2) + (m1 % 2)) * (1 + 2 * (m1 % 2));
	if (wd === wd1 || wd === wd2) y = 1;
	return a[y];
}

function pyathada(bm: number, wd: number): string {
	const a: string[] = ["", "Pyathada", "Afternoon Pyathada"];
	const m1: number = bm % 4;
	let p = 0;
	const wda: number[] = [1, 3, 3, 0, 2, 1, 2];
	if (m1 === 0 && wd === 4) p = 2; //afternoon pyathada
	if (m1 === wda[wd]) p = 1;
	return a[p];
}
export function yp(bm: number, wd: number): string | string[] {
	const y = yatyaza(bm, wd);
	const p = pyathada(bm, wd);
	let r: string | string[] = "";
	if (p === "" && y === "") {
		r = "";
	} else if (y !== "" && p !== "") {
		r = [y, p];
	} else if (y === "" && p !== "") {
		r = p;
	} else if (y !== "" && p === "") {
		r = y;
	}
	return r;
}
