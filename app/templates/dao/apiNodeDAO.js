/**
 * Created by oluwasegunmatthew on 30/06/16.
 */
var _config = require('config.json')('./config/_app.json');
var Resp = require('../dao/Response');
var Util = require('../libraries/Utility');
var entryModel = require('../model/_EntryModel');
var ApiNodeDAO = {

    load_all_entries: function(param,callback){
        var entryModel = require('../model/EntryModel');
        entryModel.search(Util.extract_search_data(param,_config.api_query_limit),function(state){
            if(state && state['top-terms-aggregation']){
                var bucket = state['top-terms-aggregation'].buckets
                return callback(Resp.success({msg:bucket.length+" aggregated data",resp:bucket}));
            }else if(state.total > 0 && state.hits.length > 0){
                var resp = state;
                if(param.count) resp = state.total;
                return callback(Resp.success({msg:state.total+" data found",resp:resp}));
            }else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        });
    }
}

module.exports = ApiNodeDAO;
