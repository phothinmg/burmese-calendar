export type Language = "English" | "Burmese";
export class BcTranslate {
	protected langs: string[][] = [
		//
		["Sunday", "တနင်္ဂနွေ"],
		["Monday", "တနင်္လာ"],
		["Tuesday", "အင်္ဂါ"],
		["Wednesday", "ဗုဒ္ဓဟူး"],
		["Thursday", "ကြာသပတေး"],
		["Friday", "သောကြာ"],
		["Saturday", "စနေ"],
		//
		//
		["January", "ဇန်နဝါရီ"],
		["February", "ဖေဖော်ဝါရီ"],
		["March", "မတ်"],
		["April", "ဧပြီ"],
		["May", "မေ"],
		["June", "ဇွန်"],
		["July", "ဇူလိုင်"],
		["August", "ဩဂုတ်"],
		["September", "စက်တင်ဘာ"],
		["October", "အောက်တိုဘာ"],
		["November", "နိုဝင်ဘာ"],
		["December", "ဒီဇင်ဘာ"],
		//
		//
		["Tagu", "တန်ခူး"],
		["Kason", "ကဆုန်"],
		["Nayon", "နယုန်"],
		["Waso", "ဝါဆို"],
		["Wagaung", "ဝါခေါင်"],
		["Tawthalin", "တော်သလင်း"],
		["Thadingyut", "သီတင်းကျွတ်"],
		["Tazaungmon", "တန်ဆောင်မုန်း"],
		["Nadaw", "နတ်တော်"],
		["Pyatho", "ပြာသို"],
		["Tabodwe", "တပို့တွဲ"],
		["Tabaung", "တပေါင်း"],
		["First Waso", "ပ-ဝါဆို"],
		["Late Tagu", "နှောင်းတန်ခူး"],
		["Late Kason", "နှောင်းကဆုန်"],
		//
		["Waxing", "လဆန်း"],
		["Waning", "လဆုတ်"],
		["Full Moon", "လပြည့်"],
		["New Moon", "လကွယ်"],
		//
		["East", "အရှေ့"],
		["West", "အနောက်"],
		["South", "တောင်"],
		["North", "မြောက်"],
		//
		["Binga", "ဘင်္ဂ"],
		["Atun", "အထွန်း"],
		["Yaza", "ရာဇ"],
		["Adipati", "အဓိပတိ"],
		["Marana", "မရဏ"],
		["Thike", "သိုက်"],
		["Puti", "ပုတိ"],
		//
		["Amyeittasote", "အမြိတ္တစုတ်"],
		["Warameittugyi", "ဝါရမိတ္တုကြီး"],
		["Warameittunge", "ဝါရမိတ္တုငယ်"],
		["Thamaphyu", "သမားဖြူ"],
		["Thamanyo", "သမားညို"],
		["Yatpote", "ရက်ပုပ်"],
		["Yatyotema", "ရက်ယုတ်မာ"],
		["Mahayatkyan", "မဟာရက်ကြမ်း"],
		["Nagapor", "နဂါးပေါ်"],
		["Shanyat", "ရှမ်းရက်"],
		//
		["Ogre", "ဘီလူး"],
		["Elf", "နတ်"],
		["Human", "လူ"],
		//
		["Sabbath Eve", "အဖိတ်"],
		["Sabbath", "ဥပုသ်"],
		//
		["Yatyaza", "ရက်ရာဇာ"],
		["Pyathada", "ပြဿဒါး"],
		["Afternoon Pyathada", "မွန်းလွဲပြဿဒါး"],
		//
		["Independence Day", "လွတ်လပ်ရေးနေ့"],
		["Union Day", "ပြည်ထောင်စုနေ့"],
		["Peasants' Day", "တောင်သူလယ်သမားနေ့"],
		["Labour Day", "အလုပ်သမားနေ့"],
		["Martyrs' Day", "အာဇာနည်နေ့"],
		["Holiday", "ရုံးပိတ်ရက်"],
		["Armed Forces Day", "တပ်မတော်နေ့"],
		["New Year's Day", "နှစ်သစ်ကူးရုံးပိတ်ရက်"],
		["Christmas", "ခရစ္စမတ်နေ့"],
		//
		["Burmese New Year's Day", "နှစ်ဆန်း"],
		["Thingyan Atat", "သင်္ကြန်အတက်နေ့"],
		["Thingyan Akyat", "သင်္ကြန်အကြတ်နေ့"],
		["Thingyan Akya", "သင်္ကြန်အကျနေ့"],
		["Thingyan Akyo", "သင်္ကြန်အကြိုနေ့"],
		//
		["Eid al-Adha", "အိဒ်နေ့"],
		["Deepavali", "ဒီဝါလီ"],
		//
		["Buddha Day", "ဗုဒ္ဓနေ့"],
		["Beginning of Buddhist Lent", "ဓမ္မစကြာနေ့"],
		["End of Buddhist Lent", "သီတင်းကျွတ်မီးထွန်းပွဲ"],
		["Tazaungdaing", "တန်ဆောင်တိုင်"],
		["National Day", "အမျိုးသားနေ့"],
		["Karen New Year's Day", "ကရင်နှစ်သစ်ကူး"],
		["Tabaung Pwe", "တပေါင်းပွဲ"],
	];
	/**
	 * Translates a number from 0-9 into a string based on the given language.
	 * If the language is English, the number is returned as is.
	 * If the language is not English, the number is translated into a string based on the Myanmer digits.
	 * @param a The number to translate.
	 * @param lang The language to translate the number into. Defaults to English.
	 * @returns The translated number as a string.
	 */
	public translateNum(a: number, lang?: Language): string | number {
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
	}
	/**
	 * Translates a string or an array of strings based on the given language.
	 * If the language is English, the input string(s) are returned as is.
	 * If the language is not English, the string(s) are translated using the provided array.
	 *
	 * @param str The string or array of strings to translate.
	 * @param array A 2D array where each sub-array contains a pair of strings,
	 *              with the first element being the original string and the second the translated string.
	 * @param lang The language to translate the string(s) into. Defaults to English.
	 * @returns The translated string or array of strings.
	 */

	public translateStr(str: string | string[], lang?: Language) {
		const l: Language = lang ?? "English";
		let r: string | string[] = "";
		if (l === "English") {
			r = str;
		} else {
			if (Array.isArray(str)) {
				const y: string[] = [];
				str.map((i) => {
					const z = this.langs.filter((k) => k[0] === i);
					y.push(z[0][1]);
				});
				r = y;
			} else {
				const x = this.langs.find((i) => i[0] === str);
				r = x ? x[1] : "";
			}
		}
		return r;
	}
}
