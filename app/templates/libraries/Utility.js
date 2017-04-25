var Utility = {
    rand_str:function(len,charset){
        if(!len) len = 3;
        if(!charset) charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        var text = "";
        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    },

    code_generator:function(){
        return Utility.rand_str(7,"ABCDEFGHJKMNPQRSTUVWXYZ23456789")
    },

    trans_id: function(){
        return Date.now();
    },

    extract_search_data: function(param,limit){
        var _excluded_key = ["sort","from","size","aggs","range","count"]
        var query_must = [], start = 0, sort=[], aggs=null

        for (key in param){
            var match = {}; match[key] = param[key]
            if(param[key] != "" && _excluded_key.indexOf(key) == -1) query_must.push({match: match})
            if(key == "range") query_must.push({range:JSON.parse(param[key])})
        }

        if(query_must.length == 0) query_must = [{match_all:{}}]
        if(param.size) limit = param.size;
        if(param.from) start = param.from;
        if(param.sort) sort  = param.sort;
        if(param.aggs) {
            var _aggs  = JSON.parse(param.aggs)
            aggs = {
                "top-terms-aggregation": {
                    "terms": {
                        "field": _aggs.field,
                        "size": _aggs.size
                    }
                }
            }
        }

        var search_param = {"query":
                                {"query": {
                                    "bool": {
                                        "must": query_must
                                        }
                                    }
                                },
                                aggs:aggs,
                                size:limit,
                                from:start,
                                sort:sort
        };
        return search_param;
    },

    title_case: function(text){
        var change_case = require('change-case');
        var lower = change_case.lowerCase(text);
        return change_case.upperCaseFirst(lower);
    },

    random_int: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    decimal_point: function(value,dp){
        _dp = 1
        if(dp) _dp = dp;

        return parseFloat(value).toFixed(dp)
    },

    isEmpty: function(obj) {
        if (obj == null) return true;
        if (obj.length && obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        // toString and toValue enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    },

    msisdn_sanitizer: function(msisdn,plus){
        if(msisdn) {
            msisdn = msisdn.replace(/\s+/g, '');
            msisdn = msisdn.replace('+', '');

            if (!isNaN(msisdn)) {
                if (msisdn.match(/^234/i)) msisdn = '0' + msisdn.substr(3);

                if (msisdn.length == 11) {
                    msisdn = '+234' + msisdn.substr(1);

                    if (!plus)  msisdn = msisdn.replace('+', '');

                    return msisdn;
                } else {
                    return "";
                }
            } else
                return "";
        }else
            return "";
    },

    keyword_sanitizer: function(keyword){
        var santized_string = keyword.replace("  ","")
            santized_string =  santized_string.replace(",,",",")
            santized_string = santized_string.replace(", ",",")
            santized_string = santized_string.replace(" ,",",")
            santized_string = santized_string.replace(", ",",")
            santized_string = santized_string.trim()
        return santized_string;
    },

    date_time: function(dt){
        var moment = require('moment');
        //return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
        return moment(dt).format('YYYY-MM-DD HH:mm:ss');
    },

    date_time_zone: function(dt){
        var moment = require('moment-timezone');
        var europe_tz   = moment.tz(dt, "Europe/London");
        var nigerian_tz = europe_tz.clone().tz('Africa/Lagos');
        return nigerian_tz.format();
        // return moment.tz(dt, "Africa/Lagos").format();
    },

    date_str: function(dt){
        //var moment = require('moment-timezone');
        //return moment.tz(dt, "Africa/Lagos").format('YYYYMMDD');
        var moment = require('moment');
        //return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
        return moment(dt).format('YYYYMMDD');
    }
};
module.exports = Utility;