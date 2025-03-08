
#include "tkrit.hpp"
#include <iostream>
#include <sstream>
#include <string>
#include <iomanip>

using namespace std;


void dt_to_julian()
{
   int year, month, day;
   tk::print("Convert date time to Julian Date and Julian Day Number", color_dark_green);
   tk::println();
   tk::println();

   cout << "Enter Year ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] :  ";
   cin >> year; // input year

   cout << "Enter Month ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-12] : ";
   cin >> month;

   cout << "Enter Day ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-31] :  ";
   cin >> day;

   cin.ignore(); // Add this line to ignore the newline character

   cout << "Enter hour [";
   tk::print_color(color_pink);
   cout << "optional ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << "default = 12";
   tk::print_color_reset();
   cout << "] [0-23] :  ";
   int hour = 12;
   string _h;
   getline(cin, _h);
   if (!_h.empty())
   {
      istringstream stream(_h);
      stream >> hour;
   }

   cout << "Enter minute [";
   tk::print_color(color_pink);
   cout << "optional ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << "default = 0";
   tk::print_color_reset();
   cout << "] [0-59] :  ";
   int minute = 0;
   string _m;
   getline(cin, _m);
   if (!_m.empty())
   {
      istringstream stream(_m);
      stream >> minute;
   }

   cout << "Enter seconds [";
   tk::print_color(color_pink);
   cout << "optional ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << "default = 0";
   tk::print_color_reset();
   cout << "] [0-59] :  ";
   int seconds = 0;
   string _s;
   getline(cin, _s);
   if (!_s.empty())
   {
      istringstream stream(_s);
      stream >> seconds;
   }

   cout << "Enter timezone offset [";
   tk::print_color(color_pink);
   cout << "optional ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << "default = 0.0";
   tk::print_color_reset();
   cout << "] :  ";
   double tz = 0.0;
   string _t;
   getline(cin, _t);
   if (!_t.empty())
   {
      istringstream stream(_t);
      stream >> tz;
   }

   tk::jdjdn j = tk::dt2jd(year, month, day, hour, 0, seconds, tz);

   tk::print_color(color_magenta);
   cout << "Julian Day Number (JDN) : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << j.jdn;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Julian Date (JD) : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << setprecision(15) << j.jd;
   tk::print_color_reset();

   tk::println(); // new line
}

void jd_to_dt(){
   double jd;
   tk::print("Convert from Julian Date or Julian Day Number to date time.", color_dark_green);
   tk::println();
   
   cout << "Enter JD or JDN ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] :  ";
   cin >> jd; // jd or jdn

   cin.ignore(); // Add this line to ignore the newline character

   cout << "Enter timezone offset [";
   tk::print_color(color_pink);
   cout << "optional ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << "default = 0.0";
   tk::print_color_reset();
   cout << "] :  ";
   double tz = 0.0;
   string _t;
   getline(cin, _t);
   if (!_t.empty())
   {
      istringstream stream(_t);
      stream >> tz;
   }

   tk::ymdhns dt = tk::jd2dt(jd,tz);
  
   tk::print_color(color_magenta);
   cout << "Year : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.year;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Month : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.month;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Day : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.day;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Hour : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.hour;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Minute : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.minute;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Seconds : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.seconds;
   tk::print_color_reset();
   tk::println();

}


void g_2_j(){
   int year, month, day;
   tk::print("Convert Gregorian Calendar date to Julian Calendar date.", color_dark_green);
   tk::println();

   cout << "Enter Year ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] :  ";
   cin >> year; // input year

   cout << "Enter Month ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-12] : ";
   cin >> month;

   cout << "Enter Day ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-31] :  ";
   cin >> day;

   tk::ymd dt =  tk::cal_convert(tk::julian,year,month,day);

   tk::print_color(color_magenta);
   cout << "Year : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.year;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Month : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.month;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Day : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.day;
   tk::print_color_reset();
   tk::println();


}

void j_2_g(){
   int year, month, day;
   tk::print("Convert Julian Calendar date to Gregorian Calendar date.", color_dark_green);
   tk::println();

   cout << "Enter Year ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] :  ";
   cin >> year; // input year

   cout << "Enter Month ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-12] : ";
   cin >> month;

   cout << "Enter Day ";
   cout << "[";
   tk::print_color(color_pink);
   cout << "required";
   tk::print_color_reset();
   cout << "] [1-31] :  ";
   cin >> day;

   tk::ymd dt =  tk::cal_convert(tk::gregorian,year,month,day);

   tk::print_color(color_magenta);
   cout << "Year : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.year;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Month : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.month;
   tk::print_color_reset();
   tk::println();

   tk::print_color(color_magenta);
   cout << "Day : ";
   tk::print_color_reset();
   tk::print_color(color_yellow);
   cout << fixed << setprecision(0) << dt.day;
   tk::print_color_reset();
   tk::println();


}

int main()
{
   int options = 0;

   tk::print("Mingalar Par! What you want to do? : ", color_light_gray);
   tk::println();
   tk::println();
   tk::print("  1 . Convert date time to Julian Date and Julian Day Number", color_light_gray);
   tk::println();
   tk::print("  2 . Convert from Julian Date or Julian Day Number to date time.", color_light_gray);
   tk::println();
   tk::print("  3 . Convert Gregorian Calendar date to Julian Calendar date.", color_light_gray);
   tk::println();
   tk::print("  4 . Convert Julian Calendar date to Gregorian Calendar date.", color_light_gray);
   tk::println();
   tk::print("  5 . Convert Gregorian Calendar date to Burmese Calendar date.", color_light_gray);
   tk::println();
   tk::println();
   tk::println();

   tk::print_color(color_dark_green);
   cout << "Please chose a number :  ";
   tk::print_color_reset();
   cin >> options;

   switch (options)
   {
   case 1:
      tk::println();
      dt_to_julian();
      break;
   case 2:
      tk::println();
      jd_to_dt();
      break;
   case 3:
      tk::println();
      g_2_j();
      break;
   case 4:
      tk::println();
      j_2_g();
      break;
   }

   return 0;
}
