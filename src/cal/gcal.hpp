#ifndef GCAL_H
#define GCAL_H

#include <string>
#include <vector>
#include <cmath>
#include <optional>

using namespace std;

namespace gcal
{
    vector<string> week_days_long = {
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    };
    vector<string> week_days_short = {
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    };
    vector<string> g_months_long = {
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    };
    vector<string> g_months_short = {
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    };
    enum ct
    {
        gregorian,
        julian
    };
    enum gt
    {
        isg,
        isp,
        isnot
    };
    struct G2JD
    {
        int year;
        int month;
        int day;
        optional<int> hour = nullopt;
        optional<int> minute = nullopt;
        optional<int> seconds = nullopt;
        optional<float> tz_offset = nullopt;
    };
    struct jdjdn
    {
        double jd;
        int jdn;
    };
    struct ymdhns
    {
        int year;
        int month;
        int day;
        int hour;
        int minute;
        int seconds;
    };
    struct ymd
    {
        int year;
        int month;
        int day;
    };
    double INT(double d)
    {
        if (d > 0)
        {
            return floor(d);
        }
        if (d == floor(d))
        {
            return d;
        }
        return floor(d) - 1;
    }

    int secular_diff(const int &y)
    {
        return floor(y / 100) - floor(y / 400) - 2;
    }
    gt check_g(const int &y, const int &m, const int &d)
    {
        bool is_not = y == 1582 && m == 10 && d > 4 && d < 15;
        bool is_p = y < 1582 || (y == 1582 && (m < 10 || (m == 10 && d <= 4)));
        return is_not ? isnot : is_p ? isp
                                     : isg;
    }
    jdjdn dt2jd(int year, int month, int day, optional<int> hour = nullopt, optional<int> minute = nullopt, optional<int> seconds = nullopt, optional<float> tz_offset = nullopt)
    {
        gcal::gt ckd = gcal::check_g(year, month, day);
        int _day = ckd == isnot ? 4 : day;
        int _year = month < 3 ? year - 1 : year;
        int _month = month < 3 ? month + 12 : month;
        int _hour = hour.value_or(12);
        int _minute = minute.value_or(0);
        int _seconds = seconds.value_or(0);
        float tz = tz_offset.value_or(0);
        int a = INT(year / 100.0);
        double b = 2 - a + INT(a / 4.0);
        float tzos = tz / 24;
        float def = (_hour - 12) / 24.0 + _minute / 1440.0 + _seconds / 86400.0;
        double _jd = INT(365.25 * (_year + 4716)) + INT(30.6001 * (_month + 1)) + _day + b - 1524.5 + tzos + def;
        double jd = ckd == isp ? _jd + 10 : _jd;
        int jdn = round(jd);
        return {jd,jdn};
    }
    ymdhns jd2dt(double jd,optional<float> tz_offset = nullopt)
    {
        float tz = tz_offset.value_or(0.0);
        double temp = jd + 0.5 + (tz / 24);
        int Z = trunc(temp);
        double F = temp - Z;
        int A = Z;
        if (Z >= 2299161)
        {
            double alpha = INT((Z - 1867216.25) / 36524.25);
            A = Z + 1 + alpha - INT(alpha / 4);
        }

        int B = A + 1524;
        int C = INT((B - 122.1) / 365.25);
        int D = INT(365.25 * C);
        int E = INT((B - D) / 30.6001);

        int day = B - D - INT(30.6001 * E) + F;
        int month = E - 1;
        if (E > 13)
        {
            month = E - 13;
        }
        int year = C - 4716;
        if (month < 3)
        {
            year = C - 4715;
        }
        double P = F * 24;
        int hour = trunc(P);
        double H = (P - hour) * 60;
        int minute = trunc(H);
        double O = (H - minute) * 60;
        int seconds = round(O);
        return {year, month, day, hour, minute, seconds};
    }
    ymd cal_convert(ct ct_to,int y,int m, int d)
    {
        jdjdn j = dt2jd(y, m, d);
        int diff = secular_diff(y);
        double jdd = ct_to == julian ? j.jd - diff : j.jd + diff;
        ymdhns dt = jd2dt(jdd);
        return {year : dt.year, month : dt.month, day : dt.day};
    }
} // namespace gcal

#endif // GCAL_H