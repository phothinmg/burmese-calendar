import { astro } from "./as.js";
import { nagahle, sabbath } from "./bd.js";
import { mahabote, natkhat } from "./bd.js";
import { yp } from "./yp.js";

type AstroParams = {
	/**
	 * Year
	 */
	by: number;
	/**
	 * Month
	 *
	 * [0-14]
	 */
	bm: number;
	/**
	 * Length of month
	 */
	ml: number;
	/**
	 * Day
	 *
	 * [1-30]
	 */
	bd: number;
	/**
	 * Weekday ID
	 */
	wd: number;
};

export type Astro = {
	/**
	 * Push astro days to an array of string
	 * @param hs array of string to push astro days
	 */
	asd: (hs: string[]) => void;
	ypy: string | string[];
	sbd: string;
	ngl: string;
	mhb: string;
	nkt: string;
};

export function astroDays({ by, bm, ml, bd, wd }: AstroParams): Astro {
	const asd = (hs: string[]): void => astro(bm, bd, wd, hs);
	const ypy: string | string[] = yp(bm, wd);
	const sbd: string = sabbath(bd, ml);
	const ngl: string = nagahle(bm);
	const mhb: string = mahabote(by, wd);
	const nkt: string = natkhat(by);
	return {
		asd,
		ypy,
		sbd,
		ngl,
		mhb,
		nkt,
	};
}
