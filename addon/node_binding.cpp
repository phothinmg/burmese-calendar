#include "tkrit.hpp"

#include <node.h>

using v8::Array;
using v8::Boolean;
using v8::Exception;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Integer;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object; // Include Object header
using v8::String;
using v8::Value;

using tk::BcalInfo;
using tk::bcalInfo;
using tk::cal_convert;
using tk::ct;
using tk::dt2jd;
using tk::Dv;
using tk::English;
using tk::get_local;
using tk::GetLocal;
using tk::jd2dt;
using tk::jdjdn;
using tk::Languages;
using tk::Mv;
using tk::year_v;
using tk::ymd;
using tk::ymdhns;
using tk::Yv;

void g2j(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() < 3 || args.Length() > 7)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }
    int year = args[0]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int month = args[1]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int day = args[2]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int hour = (args.Length() > 3) ? args[3]->Int32Value(isolate->GetCurrentContext()).ToChecked() : 12;
    int minute = (args.Length() > 4) ? args[4]->Int32Value(isolate->GetCurrentContext()).ToChecked() : 0;
    int seconds = (args.Length() > 5) ? args[5]->Int32Value(isolate->GetCurrentContext()).ToChecked() : 0;
    float tz_offset = (args.Length() > 6) ? args[6]->NumberValue(isolate->GetCurrentContext()).ToChecked() : 0.00;

    jdjdn j = dt2jd(year, month, day, hour, minute, seconds, tz_offset);

    Local<Object> result = Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "jd").ToLocalChecked(), Number::New(isolate, static_cast<double>(j.jd))).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "jdn").ToLocalChecked(), Integer::New(isolate, j.jdn)).Check();

    args.GetReturnValue().Set(result);
}
void j2g(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() < 1 || args.Length() > 2)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }

    double jd = args[0]->NumberValue(isolate->GetCurrentContext()).ToChecked();
    float tz_offset = (args.Length() > 1) ? args[1]->NumberValue(isolate->GetCurrentContext()).ToChecked() : 0.00;

    ymdhns dt = jd2dt(jd, tz_offset);

    Local<Object> result = Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year").ToLocalChecked(), Integer::New(isolate, dt.year)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month").ToLocalChecked(), Integer::New(isolate, dt.month)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "day").ToLocalChecked(), Integer::New(isolate, dt.day)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "hour").ToLocalChecked(), Integer::New(isolate, dt.hour)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "minute").ToLocalChecked(), Integer::New(isolate, dt.minute)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "second").ToLocalChecked(), Integer::New(isolate, dt.seconds)).Check();

    args.GetReturnValue().Set(result);
}

void calc(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() < 4 || args.Length() > 4)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }

    ct _ct = static_cast<ct>(args[0]->Int32Value(isolate->GetCurrentContext()).ToChecked());
    int year = args[1]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int month = args[2]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int day = args[3]->Int32Value(isolate->GetCurrentContext()).ToChecked();

    ymd dt = cal_convert(_ct, year, month, day);

    Local<Object> result = Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year").ToLocalChecked(), Integer::New(isolate, dt.year)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month").ToLocalChecked(), Integer::New(isolate, dt.month)).Check();
    result->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "day").ToLocalChecked(), Integer::New(isolate, dt.day)).Check();

    args.GetReturnValue().Set(result);
}
Local<Object> getdv(int year, int month, int day, Isolate *isolate, optional<Languages> lang = nullopt)
{

    Languages lan = lang.value_or(English);

    Yv y = year_v(year, lan);
    Mv m = y.month_views[month - 1];
    Dv d = m.date_views[day - 1];
    BcalInfo b = d.bcal_info;

    Local<String> year_s = String::NewFromUtf8(isolate, d.year_str.c_str()).ToLocalChecked();
    Local<String> m_sr_l = String::NewFromUtf8(isolate, d.month_str_long.c_str()).ToLocalChecked();
    Local<String> m_sr_s = String::NewFromUtf8(isolate, d.month_str_short.c_str()).ToLocalChecked();
    Local<String> d_str = String::NewFromUtf8(isolate, d.day_str.c_str()).ToLocalChecked();
    Local<String> wd_s_l = String::NewFromUtf8(isolate, d.wd_str_long.c_str()).ToLocalChecked();
    Local<String> wd_s_s = String::NewFromUtf8(isolate, d.wd_str_short.c_str()).ToLocalChecked();

    Local<String> ssy_s = String::NewFromUtf8(isolate, b.sasana_year_str.c_str()).ToLocalChecked();
    Local<String> by_s = String::NewFromUtf8(isolate, b.burmese_year_str.c_str()).ToLocalChecked();
    Local<String> bm_s = String::NewFromUtf8(isolate, b.burmese_month_str.c_str()).ToLocalChecked();
    Local<String> mp_s = String::NewFromUtf8(isolate, b.moon_phases_str.c_str()).ToLocalChecked();
    Local<String> fd_s = String::NewFromUtf8(isolate, b.fortnight_day_str.c_str()).ToLocalChecked();
    Local<String> bd_s = String::NewFromUtf8(isolate, b.burmese_day_str.c_str()).ToLocalChecked();

    Local<String> mhb_s = String::NewFromUtf8(isolate, b.mahabote.c_str()).ToLocalChecked();
    Local<String> ngl_s = String::NewFromUtf8(isolate, b.nagahle.c_str()).ToLocalChecked();
    Local<String> nkt_s = String::NewFromUtf8(isolate, b.nakhat.c_str()).ToLocalChecked();
    Local<String> shb_s = String::NewFromUtf8(isolate, b.sabbath.c_str()).ToLocalChecked();
    Local<String> yyz_s = String::NewFromUtf8(isolate, b.yatyaza.c_str()).ToLocalChecked();
    Local<String> pdt_s = String::NewFromUtf8(isolate, b.pyathada.c_str()).ToLocalChecked();

    Local<Array> hlds = Array::New(isolate, b.public_holiday.size());
    for (unsigned int i = 0; i < b.public_holiday.size(); i++)
    {
        hlds->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, b.public_holiday[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Object> bcal_obj = Object::New(isolate);
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_year").ToLocalChecked(), Integer::New(isolate, b.sasana_year)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_year_str").ToLocalChecked(), ssy_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_year").ToLocalChecked(), Integer::New(isolate, b.burmese_year)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_year_str").ToLocalChecked(), by_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_month_index").ToLocalChecked(), Integer::New(isolate, b.burmese_month_index)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_month_str").ToLocalChecked(), bm_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "moon_phases_index").ToLocalChecked(), Integer::New(isolate, b.moon_phases_index)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "moon_phases_str").ToLocalChecked(), mp_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "fortnight_day").ToLocalChecked(), Integer::New(isolate, b.fortnight_day)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "fortnight_day_str").ToLocalChecked(), fd_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_day").ToLocalChecked(), Integer::New(isolate, b.burmese_day)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_day_str").ToLocalChecked(), bd_s).Check();

    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "mahabote").ToLocalChecked(), mhb_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "nagahle").ToLocalChecked(), ngl_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "nakhat").ToLocalChecked(), nkt_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "is_sabbath_schoolHoliday").ToLocalChecked(), Boolean::New(isolate, b.is_sabbath_schoolHoliday)).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sabbath").ToLocalChecked(), shb_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "yatyaza").ToLocalChecked(), yyz_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "pyathada").ToLocalChecked(), pdt_s).Check();
    bcal_obj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "public_holiday").ToLocalChecked(), hlds).Check();

    Local<Object> dobj = Object::New(isolate);
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "jdn").ToLocalChecked(), Integer::New(isolate, d.jdn)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year").ToLocalChecked(), Integer::New(isolate, d.year)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year_str").ToLocalChecked(), year_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month").ToLocalChecked(), Integer::New(isolate, d.month)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month_str_long").ToLocalChecked(), m_sr_l).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month_str_short").ToLocalChecked(), m_sr_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "day").ToLocalChecked(), Integer::New(isolate, d.day)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "day_str").ToLocalChecked(), d_str).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "wd_str_long").ToLocalChecked(), wd_s_l).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "wd_str_short").ToLocalChecked(), wd_s_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "bcal_info").ToLocalChecked(), bcal_obj).Check();

    return dobj;
}

Local<Object> getmv(int year, int month, Isolate *isolate, optional<Languages> lang = nullopt)
{
    Languages lan = lang.value_or(English);

    Yv y = year_v(year, lan);
    Mv d = y.month_views[month - 1];

    Local<String> year_s = String::NewFromUtf8(isolate, d.year_str.c_str()).ToLocalChecked();
    Local<String> m_sr_l = String::NewFromUtf8(isolate, d.month_str_long.c_str()).ToLocalChecked();
    Local<String> m_sr_s = String::NewFromUtf8(isolate, d.month_str_short.c_str()).ToLocalChecked();

    Local<Array> ssy = Array::New(isolate, d.sasana_years.size());
    for (unsigned int i = 0; i < d.sasana_years.size(); i++)
    {
        ssy->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, d.sasana_years[i])).Check();
    }

    Local<Array> ssy_s = Array::New(isolate, d.sasana_years_str.size());
    for (unsigned int i = 0; i < d.sasana_years_str.size(); i++)
    {
        ssy_s->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, d.sasana_years_str[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Array> by = Array::New(isolate, d.burmese_years.size());
    for (unsigned int i = 0; i < d.burmese_years.size(); i++)
    {
        by->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, d.burmese_years[i])).Check();
    }

    Local<Array> by_s = Array::New(isolate, d.burmese_years_str.size());
    for (unsigned int i = 0; i < d.burmese_years_str.size(); i++)
    {
        by_s->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, d.burmese_years_str[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Array> bm = Array::New(isolate, d.burmese_months.size());
    for (unsigned int i = 0; i < d.burmese_months.size(); i++)
    {
        bm->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, d.burmese_months[i])).Check();
    }

    Local<Array> bm_s = Array::New(isolate, d.burmese_months_str.size());
    for (unsigned int i = 0; i < d.burmese_months_str.size(); i++)
    {
        bm_s->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, d.burmese_months_str[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Array> dv = Array::New(isolate, d.date_views.size());
    for (unsigned int i = 0; i < d.date_views.size(); i++)
    {
        dv->Set(isolate->GetCurrentContext(), i, getdv(year, month, i + 1, isolate, lan)).Check();
    }

    Local<Object> dobj = Object::New(isolate);
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "days_in_month").ToLocalChecked(), Integer::New(isolate, d.days_in_month)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year").ToLocalChecked(), Integer::New(isolate, d.year)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year_str").ToLocalChecked(), year_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month").ToLocalChecked(), Integer::New(isolate, d.month)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month_str_long").ToLocalChecked(), m_sr_l).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month_str_short").ToLocalChecked(), m_sr_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_years").ToLocalChecked(), ssy).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_years_str").ToLocalChecked(), ssy_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_years").ToLocalChecked(), by).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_years_str").ToLocalChecked(), by_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_months").ToLocalChecked(), bm).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_months_str").ToLocalChecked(), bm_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "date_views").ToLocalChecked(), dv).Check();

    return dobj;
}

Local<Object> getyv(Isolate *isolate, optional<int> year = nullopt, optional<Languages> lang = nullopt)
{

    GetLocal loc = get_local();
    Languages lan = lang.value_or(English);
    int _year = year.value_or(loc._year);

    Yv d = year_v(_year, lan);

    Local<String> year_s = String::NewFromUtf8(isolate, d.year_str.c_str()).ToLocalChecked();

    Local<Array> ssy = Array::New(isolate, d.sasana_years.size());
    for (unsigned int i = 0; i < d.sasana_years.size(); i++)
    {
        ssy->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, d.sasana_years[i])).Check();
    }

    Local<Array> ssy_s = Array::New(isolate, d.sasana_years_str.size());
    for (unsigned int i = 0; i < d.sasana_years_str.size(); i++)
    {
        ssy_s->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, d.sasana_years_str[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Array> by = Array::New(isolate, d.burmese_years.size());
    for (unsigned int i = 0; i < d.burmese_years.size(); i++)
    {
        by->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, d.burmese_years[i])).Check();
    }

    Local<Array> by_s = Array::New(isolate, d.burmese_years_str.size());
    for (unsigned int i = 0; i < d.burmese_years_str.size(); i++)
    {
        by_s->Set(isolate->GetCurrentContext(), i, String::NewFromUtf8(isolate, d.burmese_years_str[i].c_str()).ToLocalChecked()).Check();
    }

    Local<Array> mv = Array::New(isolate, d.month_views.size());
    for (unsigned int i = 0; i < d.month_views.size(); i++)
    {
        mv->Set(isolate->GetCurrentContext(), i, getmv(_year, i + 1, isolate, lan)).Check();
    }

    Local<Object> dobj = Object::New(isolate);
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year").ToLocalChecked(), Integer::New(isolate, d.year)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "year_str").ToLocalChecked(), year_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_years").ToLocalChecked(), ssy).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "sasana_years_str").ToLocalChecked(), ssy_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_years").ToLocalChecked(), by).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "burmese_years_str").ToLocalChecked(), by_s).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "month_views").ToLocalChecked(), mv).Check();

    return dobj;
}
void dv(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() < 3 || args.Length() > 4)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }
    int year = args[0]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int month = args[1]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int day = args[2]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    Languages lang = (args.Length() > 3) ? static_cast<Languages>(args[3]->Int32Value(isolate->GetCurrentContext()).ToChecked()) : static_cast<Languages>(English);

    Local<Object> dobj = getdv(year, month, day, isolate, lang);
    args.GetReturnValue().Set(dobj);
}
void mv(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() < 2 || args.Length() > 3)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }
    int year = args[0]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    int month = args[1]->Int32Value(isolate->GetCurrentContext()).ToChecked();
    Languages lang = (args.Length() > 2) ? static_cast<Languages>(args[2]->Int32Value(isolate->GetCurrentContext()).ToChecked()) : static_cast<Languages>(English);

    Local<Object> dobj = getmv(year, month, isolate, lang);
    args.GetReturnValue().Set(dobj);
}
void yv(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.Length() > 2)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }
    GetLocal loc = get_local();

    int year = (args.Length() > 0) ? args[0]->Int32Value(isolate->GetCurrentContext()).ToChecked() : loc._year;
    Languages lang = (args.Length() > 1) ? static_cast<Languages>(args[1]->Int32Value(isolate->GetCurrentContext()).ToChecked()) : static_cast<Languages>(English);
    Local<Object> dobj = getyv(isolate, year, lang);
    args.GetReturnValue().Set(dobj);
}
void getloc(const FunctionCallbackInfo<Value> &args){
    Isolate *isolate = args.GetIsolate();
    if (args.Length() > 0)
    {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
        return;
    }
    GetLocal loc = get_local();

    Local<Object> dobj = Object::New(isolate);
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "current_year").ToLocalChecked(), Integer::New(isolate, loc._year)).Check();
    dobj->Set(isolate->GetCurrentContext(), String::NewFromUtf8(isolate, "local_tzoffset").ToLocalChecked(), Number::New(isolate, static_cast<double>(loc.local_offset))).Check();
    args.GetReturnValue().Set(dobj);

}
void Init(Local<Object> exports)
{
    NODE_SET_METHOD(exports, "datetimeToJd", g2j);
    NODE_SET_METHOD(exports, "jdToDatetime", j2g);
    NODE_SET_METHOD(exports, "calConverter", calc);
    NODE_SET_METHOD(exports, "dayView", dv);
    NODE_SET_METHOD(exports, "monthView", mv);
    NODE_SET_METHOD(exports, "yearView", yv);
    NODE_SET_METHOD(exports, "getLocal", getloc);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, [](Local<Object> exports, Local<Value> module, void *priv)
            { Init(exports); })