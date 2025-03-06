#ifndef BCAL_H
#define BCAL_H

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <cmath>
#include <algorithm>
#include <iomanip>

using namespace std;

namespace bcal
{
    /// @brief  The length of a solar year in the Burmese calendar is defined as 1577917828/4320000 (365.2587565) days [Irwin, 1909].
    double SY = 1577917828 / 4320000;
    /// @brief  The length of a lunar month in the Burmese calendar is defined as 1577917828/53433336 (29.53058795) days [Irwin, 1909].
    double LM = 1577917828 / 53433336;
    /// @brief Estimated Julian Date value of the starting time of the Burmese year zero [Yan Naing Aye,2013]
    double MO = 1954168.050623;
    vector<std::string> b_month_name = {
        "First Waso",
        "Tagu",
        "Kason",
        "Nayon",
        "Waso",
        "Wagaung",
        "Tawthalin",
        "Thadingyut",
        "Tazaungmon",
        "Nadaw",
        "Pyatho",
        "Tabodwe",
        "Tabaung",
        "Late Tagu",
        "Late Kason",
    };
    vector<std::string> moon_phases = {
        "Waxing", "Full Moon", "Waning", "New Moon"};
    /// @brief The second full moon of Waso, which was in conflict with the calendar advisory group, must be checked and filled in every year.
    vector<pair<int, int>> fme = {
        {1377, 1}, //
        {1234, 1},
        {1261, -1},
        {1120, 1},
        {1126, -1},
        {1150, 1},
        {1172, -1},
        {1207, 1},
        {813, -1},
        {849, -1},
        {851, -1},
        {854, -1},
        {927, -1},
        {933, -1},
        {936, -1},
        {938, -1},
        {949, -1},
        {952, -1},
        {963, -1},
        {968, -1},
        {1039, -1},
        {205, 1},
        {246, 1},
        {471, 1},
        {572, -1},
        {651, 1},
        {653, 2},
        {656, 1},
        {672, 1},
        {729, 1},
        {767, -1}};
    vector<int> wte_one = {1201, 1263, 1344};
    vector<int> wte_zero = {1202, 1264, 1345};
    struct J2B
    {
        int ssy;
        int byt;
        int by;
        int byl;
        int bm;
        int bmt;
        int bml;
        int mp;
        int bd;
        int fd;
        int wsofm;
        bool warDwin;
        string bm_str;
        string mp_str;
    };
    /// @brief Burmese Years ID.
    enum EraIds
    {
        ERA_3 = 3,
        ERA_2 = 2,
        ERA_1_3 = 13, // Assuming 1.3 is represented as 13
        ERA_1_2 = 12, // Assuming 1.2 is represented as 12
        ERA_1_1 = 11  // Assuming 1.1 is represented as 11
    };
    struct GetWoNm
    {
        float WO;
        int NM;
    };
    struct GetTaTw
    {
        float TA; // ရက်ပိုညှိကိန်း TA
        float TW; // ဝါထပ်ကိန်း TW
    };
    struct YearData
    {
        int myt;
        int tg1;
        int fm;
        int err;
    };
    /* ----- Astro ---- */
    struct Astros
    {
        string mahabote;
        string nagahle;
        string natkhat;
        int sabbath_index;
        string sabbath;
        string yatyaza;
        string pyathada;
    };
    /* Holidays */
    vector<pair<int, string>> subDays = {
        {2459300, "Tabaung Full Moon Substitute"},
        {2459184, "Armed Forces Day Substitute"}};
    vector<int> eid_days = {
        // 2019
        2459062,
        // 2020 **
        2459182

    };
    vector<int> depavali_days = {
        // 2019
        2458785};
    /* --------------------------------------------------------------------------------------------------------------------- */
    /// @brief Map for FME
    unordered_map<int, int> fme_map = []()
    {
        unordered_map<int, int> map;
        for (const auto &pair : fme)
        {
            map[pair.first] = pair.second;
        }
        return map;
    }();
    unordered_map<int, string> subDays_map = []()
    {
        unordered_map<int, string> map;
        for (const auto &pair : subDays)
        {
            map[pair.first] = pair.second;
        }
        return map;
    }();
    /// @brief Check fme
    /// @param by
    int searchFme(int by)
    {
        int r = 0;
        auto it = fme_map.find(by);
        if (it != fme_map.end())
        {
            r = it->second;
        }

        return r;
    }
    int by2ky(int by) { return by + 3739; };
    int by2ssy(int by) { return by + 1182; };

    EraIds eraIad(int by)
    {
        if (by >= 1312)
            return EraIds::ERA_3;
        if (by >= 1217)
            return EraIds::ERA_2;
        if (by >= 1100)
            return EraIds::ERA_1_3;
        if (by >= 798)
            return EraIds::ERA_1_2;
        return EraIds::ERA_1_1;
    }
    GetWoNm getWoNm(int by)
    {
        unordered_map<EraIds, GetWoNm> eraConfigurations = {
            {ERA_3, {-0.5, 8}},
            {ERA_2, {-1, 4}},
            {ERA_1_3, {-0.85, -1}},
            {ERA_1_2, {-1.1, -1}},
            {ERA_1_1, {-1.1, -1}},
        };

        EraIds id = eraIad(by); // error handle already here
        return {
            eraConfigurations[id].WO + searchFme(by),
            eraConfigurations[id].NM};
    }
    GetTaTw getTaTw(int by)
    {
        double SY = 1577917828.0 / 4320000.0;  // solar year (365.2587565)
        double LM = 1577917828.0 / 53433336.0; // lunar month (29.53058795)
        int NM = getWoNm(by).NM;
        float TA = (12 - NM) * (SY / 12 - LM);
        float TW = LM - NM * (SY / 12 - LM);
        return {
            TA, TW};
    }

    double excessDays(int by)
    {
        double SY = 1577917828.0 / 4320000.0;  // solar year (365.2587565)
        double LM = 1577917828.0 / 53433336.0; // lunar month (29.53058795)
        int NM = getWoNm(by).NM;
        double TA = (SY / 12 - LM) * (12 - NM); // threshold to adjust
        double ed = fmod(SY * (by + 3739), LM);
        if (ed < TA)
            ed += LM; // adjust excess days
        return ed;
    }
    double newYearTime(int by)
    {
        double SY = 1577917828.0 / 4320000.0; // solar year (365.2587565)
        double MO = 1954168.050623;           // beginning of 0 ME for MMT
        return SY * by + MO;
    }

    template <typename C, typename T>
    bool contains(const C &c, const T &e)
    {
        return end(c) != find(cbegin(c), cend(c), e);
    }
    int checkWarhtat(int by)
    {
        double SY = 1577917828.0 / 4320000.0;  // solar year (365.2587565)
        double LM = 1577917828.0 / 53433336.0; // lunar month (29.53058795)
        double ed = excessDays(by);
        int NM = getWoNm(by).NM;
        EraIds id = eraIad(by);
        double TW = 0;
        if (id >= EraIds::ERA_2)
        {
            TW = LM - NM * (SY / 12 - LM);
        }
        int _wt = ed >= TW ? 1 : 0;
        int r = 0;
        if (contains(wte_one, by))
        {
            r = 1;
        }
        else if (contains(wte_zero, by))
        {
            r = 0;
        }
        else
        {
            r = _wt;
        }

        return r;
    }

    int searchWasoFullMoon(int by)
    {
        double LM = 1577917828.0 / 53433336.0; // lunar month (29.53058795)
        return round(newYearTime(by) - excessDays(by) + 4.5 * LM + getWoNm(by).WO);
    }

    YearData getYearData(int by)
    {
        int a = checkWarhtat(by);
        int b1 = searchWasoFullMoon(by);
        int c = 0;
        int L = 0;
        int bs = 0;
        //int i = 0;
        for (int i = 1; i < 4; i++)
        {
            bs = searchWasoFullMoon(by - i);
            c = checkWarhtat(by - i);
            L = i;
            if (c == 1)
            {
                break;
            }
        }
        int b3 = (b1 - bs) % 354;
        int myt = (a == 0) ? a : std::floor(b3 / 31) + a;
        int fm = (a == 1) ? b1 : bs + 354 * L;
        int err = (a == 1 && b3 != 31 && b3 != 30) ? 1 : 0;
        int tg1 = bs + 354 * L - 102;

        return {myt, tg1, fm, err};
    }
    int monthLength(int byt, int bm)
    {
        int ml = 30 - fmod(bm, 2); /* စုံ = ၃၀ မ = ၂၉ */
        if (bm == 3)
        {
            ml += floor(byt / 2);
        }
        return ml;
    }

    J2B j2b(double jd)
    {
        double SY = 1577917828.0 / 4320000.0; // solar year (365.2587565)
        double MO = 1954168.050623;
        int j = round(jd);

        int by = floor((j - 0.5 - MO) / SY); // return

        YearData yd = getYearData(by);
        double dd = j - yd.tg1 + 1; // ရက်အရေအတွက်
        int b = floor(yd.myt / 2);
        int c = floor(1 / (yd.myt + 1));

        int byl = 354 + (1 - c) * 30 + b; // return
        int bmt = floor((dd - 1) / byl);  // return month type: late =1 or early = 0

        dd -= bmt * byl;

        int a = floor((dd + 423) / 512); // adjust day count and threshold

        int bm = floor((dd - b * a + c * a * 30 + 29.26) / 29.544); // return

        int e = floor((bm + 12) / 16);
        int f = floor((bm + 11) / 16);

        int bd = dd - floor(29.544 * bm - 29.26) - b * e + c * f * 30;    // return
        bm += f * 3 - e * 4 + 12 * bmt;                                   // adjust month numbers for late months
        int byt = yd.myt;                                                 // retrun
        int bml = monthLength(byt, bm);                                   // return
        int mp = floor((bd + 1) / 16) + floor(bd / 16) + floor(bd / bml); // return
        int fd = bd - 15 * floor(bd / 16);                                // return
        int ssy = by + 1182;                                              // return

        int wsofm = yd.fm;
        int tdkfm = wsofm + 89;

        bool warDwin = jd >= wsofm && jd <= tdkfm;

        string bm_str = b_month_name[bm];
        string mp_str = moon_phases[mp];

        return {ssy, byt, by, byl, bm, bmt, bml, mp, bd, fd, wsofm, warDwin, bm_str, mp_str};
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    string _mahabote(int by, int wd)
    {
        static const std::string a[] = {
            "Binga",
            "Ahtun",
            "Yaza",
            "Adipati",
            "Marana",
            "Thike",
            "Puti",
        };
        int index = (by - wd) % 7;
        std::string str = a[index];
        return str;
    }
    struct Sabbath
    {
        int index;
        string str;
    };
    Sabbath _sabbath(int bd, int lm)
    {
        static const std::string a[] = {
            "", "Sabbath", "Sabbath Eve"};
        int index = 0;
        if (bd == 8 || bd == 15 || bd == 23 || bd == lm)
            index = 1;
        if (bd == 7 || bd == 14 || bd == 22 || bd == lm - 1)
            index = 2;
        std::string str = a[index];
        return {index, str};
    }
    string _nagahle(int bm)
    {
        static const std::string a[] = {
            "West", "North", "East", "South"};
        int m1 = bm;
        if (bm <= 0)
            m1 = 4; // first warso is considered warso
        int index = (floor(m1 % 12)) / 3;
        std::string str = a[index];
        return str;
    }
    string _natkhat(int by)
    {
        static const std::string a[] = {
            "Ogre", "Elf", "Human"};
        int index = by % 3;
        std::string str = a[index];
        return str;
    }
    string _yatyaza(int bm, int wd)
    {
        static const std::string a[] = {
            "", "Yatyaza"};
        int m1 = bm % 4;
        int index = 0;
        int wd1 = (floor(m1 / 2)) + 4;
        int wd2 = (1 - (floor(m1 / 2)) + (m1 % 2)) * (1 + 2 * (m1 % 2));
        if (wd == wd1 || wd == wd2)
            index = 1;
        std::string str = a[index];
        return str;
    }
    string _pyathada(int bm, int wd)
    {
        static const std::string a[] = {
            "", "Pyathada", "Afternoon Pyathada"};
        int m1 = bm % 4;
        int index = 0;
        static const int wda[] = {1, 3, 3, 0, 2, 1, 2};
        if (m1 == 0 && wd == 4)
        {
            index = 2; // afternoon pyathada
        }
        else if (m1 == wda[wd])
        {
            index = 1;
        }
        std::string str = a[index];
        return str;
    }
    Astros getAstro(int by, int bm, int lm, int bd, int wd)
    {
        string mahabote = _mahabote(by, wd);
        string nagahle = _nagahle(bm);
        string natkhat = _natkhat(by);
        int sabbath_index = _sabbath(bd, lm).index;
        string sabbath = _sabbath(bd, lm).str;
        string yatyaza = _yatyaza(bm, wd);
        string pyathada = _pyathada(bm, wd);

        return {mahabote, nagahle, natkhat, sabbath_index, sabbath, yatyaza, pyathada};
    }
    /* -------------------------------------------------------------------------- */
    vector<string> holidays(int jdn, int y, int m, int d, int by, int bm, int bd, int mp, int bmt)
    {
        double SY = 1577917828.0 / 4320000.0; // solar year (365.2587565)
        double MO = 1954168.050623;           // beginning of 0 ME
        int BGNTG = 1100;                     // start of Thingyan
        int SE3 = 1312;                       // third era

        double atat = SY * (by + bmt) + MO; // New year time in jd
        double atar = 0;                    // Length of new year festival
        if (by >= SE3)
        {
            atar = atat - 2.169918982;
        }
        else
        {
            atar = atat - 2.1675;
        }

        int akyaNay = floor(atar); // akyaNay in jd
        int atatNay = floor(atat); // atatNay in jd

        vector<string> aa;
        if (y > 2018 && m == 1 && d == 1)
        {
            aa.push_back("New Year's Day");
        }
        else if (y >= 1948 && m == 1 && d == 4)
        {
            aa.push_back("Independence Day");
        }
        else if (y >= 1947 && m == 2 && d == 12)
        {
            aa.push_back("Union Day");
        }
        else if (y >= 1958 && m == 3 && d == 2)
        {
            aa.push_back("Peasants' Day");
        }
        else if (y >= 1945 && m == 3 && d == 27)
        {
            aa.push_back("Armed Forces Day");
        }
        else if (y >= 1923 && m == 5 && d == 1)
        {
            aa.push_back("Labour Day");
        }
        else if (y >= 1947 && m == 7 && d == 19)
        {
            aa.push_back("Martyrs' Day");
        }
        else if (y >= 1752 && m == 12 && d == 25)
        {
            aa.push_back("Christmas");
        }

        if (bm == 2 && mp == 1)
        {
            aa.push_back("Buddha Day");
        } // kason full moon day,Vesak
        else if (bm == 4 && mp == 1)
        {
            aa.push_back("Dhammasekya Day");
        } // full moon day of waso, Beginning of Buddhist Lent
        else if (bm == 7 && mp == 1)
        {
            aa.push_back("Thadingyut Full Moon Day");
        } // the end of the Buddhist lent.
        else if (by >= 1379 && bm == 7 && (bd == 14 || bd == 16))
        {
            aa.push_back("Thadingyut Holiday");
        } // Pre-Full Moon Day and Post-Full Moon Day
        else if (bm == 8 && mp == 1)
        {
            aa.push_back("Tazaungmon Full Moon Day");
        } // Full Moon Day of Tazaungmon
        else if (by >= 1379 && bm == 8 && bd == 14)
        {
            aa.push_back("Tazaungdaing Holiday");
        } // Pre-Full Moon Day
        else if (by >= 1282 && bm == 8 && bd == 25)
        {
            aa.push_back("National Day");
        } // Commemorates the anniversary of the first university student strike at Rangoon University in 1920.
        else if (bm == 10 && bd == 1)
        {
            aa.push_back("Karen New Year's Day");
        }
        else if (bm == 12 && mp == 1)
        {
            aa.push_back("Tabaung Pwe");
        } // Full Moon Day of Tabaung

        if (by >= SE3)
        {
            atar = atat - 2.169918982;
        }
        else
        {
            atar = atat - 2.1675;
        }

        if (jdn == atatNay + 1)
        {
            aa.push_back("Burmese New Year's Day");
        }

        if (by + bmt >= BGNTG)
        {
            if (jdn == atatNay)
            {
                aa.push_back("Thingyan Atat");
            }
            else if (jdn > akyaNay && jdn < atatNay)
            {
                aa.push_back("Thingyan Akyat");
            }
            else if (jdn == akyaNay)
            {
                aa.push_back("Thingyan Akya");
            }
            else if (jdn == akyaNay - 1)
            {
                aa.push_back("Thingyan Akyo");
            }
            else if (by + bmt >= 1369 && by + bmt < 1379 && (jdn == akyaNay - 2 || (jdn >= atatNay + 2 && jdn <= akyaNay + 7)))
            {
                aa.push_back("Thingyan Holiday"); // conditional add thingyan holidays
            }
            else if (by + bmt >= 1384 &&
                     by + bmt <= 1385 &&
                     (jdn == akyaNay - 5 ||
                      jdn == akyaNay - 4 ||
                      jdn == akyaNay - 3 ||
                      jdn == akyaNay - 2))
            {
                aa.push_back("Thingyan Holiday"); // conditional add thingyan holidays
            }
            else if (by + bmt >= 1386 && jdn >= atatNay + 2 && jdn <= akyaNay + 7)
            {
                aa.push_back("Thingyan Holiday"); // conditional add thingyan holidays
            }
        }
        if (contains(eid_days, jdn))
        {
            aa.push_back("Eid al-Adha");
        }

        if (contains(depavali_days, jdn))
        {
            aa.push_back("Deepavali");
        }

        auto it = subDays_map.find(jdn);
        if (it != subDays_map.end())
        {
            aa.push_back(it->second);
        }

        return aa;
    }
} // namespace gcal

#endif // BCAL_H