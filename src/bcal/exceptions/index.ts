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
/**
 * Warhtat Exceptions
 */
export const WTE: { one: number[]; zero: number[] } = {
	one: [1201, 1263, 1344, 1372, 1374, 1377, 1380, 1382, 1385],
	zero: [
		1202, 1264, 1345, 1370, 1371, 1373, 1375, 1376, 1378, 1379, 1381, 1383,
		1384, 1386,
	],
};
