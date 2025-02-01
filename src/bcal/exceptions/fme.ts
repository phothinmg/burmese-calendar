// ဒုတိယဝါဆိုလပြည့်နေ့ ပြက္ခဒိန်အကြံပေးအဖွဲ့နှင့်ကွဲလွဲခဲ့သည့်ဇယား နှစ်စဥ် စစ်ဆေးပြီးဖြည့်သွင်းရမည်
// number arry[0] သည် မြန်မာနှစ်ဖြစ်သည်။ 1 သည် ကွဲလွဲသည့်နှစ် အရေအတွက် ဖြစ်သည်။

/**
 * ဒုတိယဝါဆိုလပြည့်နေ့ ပြက္ခဒိန်အကြံပေးအဖွဲ့နှင့်ကွဲလွဲခဲ့သည့်ဇယား နှစ်စဥ် စစ်ဆေးပြီးဖြည့်သွင်းရမည်
 *
 * The second full moon of Waso, which was in conflict with the calendar advisory group, must be checked and filled in every year.
 */
export const FME: number[][] = [
	[1377, 1],
	//
	[1234, 1],
	[1261, -1],
	[1120, 1],
	[1126, -1],
	[1150, 1],
	[1172, -1],
	[1207, 1],
	[813, -1],
	[849, -1],
	[851, -1],
	[854, -1],
	[927, -1],
	[933, -1],
	[936, -1],
	[938, -1],
	[949, -1],
	[952, -1],
	[963, -1],
	[968, -1],
	[1039, -1],
	[205, 1],
	[246, 1],
	[471, 1],
	[572, -1],
	[651, 1],
	[653, 2],
	[656, 1],
	[672, 1],
	[729, 1],
	[767, -1],
];

//
/**
 * ဝါဆိုညှိကိန်း WO အတွက် ရှာလိုသောမြန်မာနှစ် FME တွင်ပါမပါ ပါလျင် ကွဲလွဲသောနှစ်အရေအတွက်အား ရရှိမည့် လုပ်ဆောင်ချက်ဖြစ်သည်။
 *
 * Is the Myanmar Year include in FME? If include, the function returns number years of different , else returns 0.
 *
 * ရလဒ်အား ဝါဆိုညှိကိန်းတွင်သွားပေါင်းမည်ဖြစ်သဖြငိ့ ဇယားတွင်မပါပါက အဖြေ သုည သတ်မှတ်ထားပါသည်။
 *
 * @param by Burmese Year
 * @returns ကွဲလွဲသောနှစ်အရေအတွက်
 */
export function searchFme(by: number): number {
	const found: number[] | undefined = FME.find((i: number[]) => i[0] === by);
	let result = 0;
	if (found !== undefined) {
		result = found[1];
	}
	return result;
}
