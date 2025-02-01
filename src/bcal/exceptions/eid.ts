// add Eid Al Adha Day,  is a public holiday under Section 25 of the Negotiable Instruments Act of the Republic of the Union of Myanmar.

const eidDays: number[] = [
	//2020
	2459063,
];

export function eid_day(jdn: number, hs: string[]) {
	if (eidDays.includes(jdn)) {
		hs.push("Eid al-Adha");
	}
}
