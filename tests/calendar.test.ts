import assert from "node:assert";
import { describe, it } from "node:test";
import Calendar, {
  type DateViewObject,
  type MonthViewObject,
  type YearViewObject,
} from "../dist/cal";
/*
 Some expected values base on https://yan9a.github.io/mmcal/index.htm, mmcal by Dr. Yan Naing Aye,
 creator of the algorithm for calculation of Burmese Calendar (Myanmar Calendar)
 */
const cal = new Calendar();
describe("Burmese Calendar Dateview Test", () => {
  it("General", async (t) => {
    const dv: DateViewObject = cal.dateView({ year: 2025, month: 2, day: 12 });
    await t.test("jdn", () => {
      const result = dv.jdn;
      const expected = 2460719;
      assert.deepEqual(result, expected);
    });
    await t.test("Month", () => {
      const result = dv.month.long;
      const expected = "February";
      assert.deepEqual(result, expected);
    });
    await t.test("Days in month", () => {
      const result = dv.month.days_in_month;
      const expected = 28;
      assert.deepEqual(result, expected);
    });
    await t.test("Weekday", () => {
      const result = dv.weekday.long;
      const expected = "Wednesday";
      // [0=Sun,...,6=Sat]
      const result1 = dv.weekday.index;
      const expected1 = 3;
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Sasana Year", () => {
      const result = dv.burmese_cal.sasana_year.id;
      const expected = 2568;
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese Year", () => {
      const result = dv.burmese_cal.burmese_year.id;
      const expected = 1386;
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese Month", () => {
      const result = dv.burmese_cal.burmese_month.str;
      const expected = "Tabodwe";
      assert.deepEqual(result, expected);
    });
    await t.test("Moon Phase", () => {
      const result = dv.burmese_cal.moon_phase.index;
      const expected = 1;
      const result1 = dv.burmese_cal.moon_phase.str;
      const expected1 = "Full Moon";
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Fortnight day", () => {
      const result = dv.burmese_cal.fortnight_day.id;
      const expected = 15;
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese day", () => {
      const result = dv.burmese_cal.burmese_day.id;
      const expected = 15;
      assert.deepEqual(result, expected);
    });
    await t.test("Nagalae", () => {
      const result = dv.burmese_cal.nagahle.index;
      const expected = 3;
      const result1 = dv.burmese_cal.nagahle.str;
      const expected1 = "South";
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Nakhat", () => {
      const result = dv.burmese_cal.nakhat.index;
      const expected = 0;
      const result1 = dv.burmese_cal.nakhat.str;
      const expected1 = "Ogre";
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Mhabote", () => {
      const result = dv.burmese_cal.mahabote.index;
      const expected = 3;
      const result1 = dv.burmese_cal.mahabote.str;
      const expected1 = "Adipati";
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Holidays", () => {
      const result1 = dv.isHoliday;
      const expected1 = true;
      const result2 = dv.burmese_cal.public_holiday;
      const expected2 = ["Union Day"];
      assert.deepEqual(result1, expected1);
      assert.deepEqual(result2, expected2);
    });
    await t.test("Astro Days", () => {
      const result = dv.burmese_cal.astro_days;
      const expected = ["Thamanyo"];
      assert.deepEqual(result, expected);
    });
  });
  it("Big Wahtut Test", async (t) => {
    await t.test("Is month of First Waso exist?", () => {
      const dv: DateViewObject = cal.dateView({
        year: 2023,
        month: 6,
        day: 22,
      });
      const result = dv.burmese_cal.burmese_month.str;
      const expected = "First Waso";
      assert.deepEqual(result, expected);
    });
    await t.test("Has month of Nayon 30 days?", () => {
      const dv: DateViewObject = cal.dateView({
        year: 2023,
        month: 6,
        day: 17,
      });
      const result = dv.jdn;
      const expected = 2460113;
      const result1 = dv.burmese_cal.burmese_day.id;
      const expected1 = 30;
      assert.deepEqual(result, expected);
      assert.deepEqual(result1, expected1);
    });
    await t.test("Check for jdn of 2nd Waso full moon", () => {
      const dv: DateViewObject = cal.dateView({ year: 2023, month: 8, day: 1 });
      const result = dv.jdn;
      const expected = 2460158;
      assert.deepEqual(result, expected);
    });
  });
  it("Normal Wahtut Test", async (t) => {
    await t.test("Is month of First Waso exist?", () => {
      const dv: DateViewObject = cal.dateView({
        year: 2020,
        month: 7,
        day: 7,
      });
      const result = dv.burmese_cal.burmese_month.str;
      const expected = "First Waso";
      assert.deepEqual(result, expected);
    });
    await t.test("Check for jdn of 2nd Waso full moon", () => {
      const dv: DateViewObject = cal.dateView({ year: 2020, month: 8, day: 3 });
      const result = dv.jdn;
      const expected = 2459065;
      assert.deepEqual(result, expected);
    });
  });
});

describe("Burmese Calendar Month View Test", () => {
  it("Check common year", async (t) => {
    await t.test("Feb has 28 days", () => {
      const mv: MonthViewObject = cal.monthView({ year: 2025, month: 2 });
      const result = mv.month.days_in_month;
      const expected = 28;
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese Years Array", () => {
      const mv: MonthViewObject = cal.monthView({ year: 2025, month: 4 });
      const result = mv.burmese_years.ids;
      const expected = [1386, 1387];
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese Months Array", () => {
      const mv: MonthViewObject = cal.monthView({ year: 2025, month: 4 });
      const result = mv.burmese_months.str;
      const expected = ["Late Tagu", "Tagu", "Kason"];
      assert.deepEqual(result, expected);
    });
  });
  it("Check leap year", async (t) => {
    await t.test("Feb has 29 days", () => {
      const mv: MonthViewObject = cal.monthView({ year: 2024, month: 2 });
      const result = mv.month.days_in_month;
      const expected = 29;
      assert.deepEqual(result, expected);
    });
  });
});

describe("Burmese Calendar Year View Test", () => {
  it("General", async (t) => {
    const yv: YearViewObject = cal.yearView({ year: 2025 });
    await t.test("Sasana Year", () => {
      const result = yv.sasana_years.ids;
      const expected = [2568, 2569];
      assert.deepEqual(result, expected);
    });
    await t.test("Burmese Year", () => {
      const result = yv.burmese_years.ids;
      const expected = [1386, 1387];
      assert.deepEqual(result, expected);
    });
  });
});
