/**
 * Created by oluwasegunmatthew on 30/06/16.
 */
var entrySchema = require('./schema/_EntrySchema');
var Mongo = require('../libraries/Mongo');


var EntryModel = {
    _mongo_cal: Mongo,

    save: function (data, callback) {
        var entry = entrySchema(data);
        Mongo._save(entry, function (state) {
            return callback(state)
        });
    },

    update: function (data,condition,callback){
        Mongo._update(entrySchema,condition,data,function(state){
            if(state){
                return callback(state);
            }

        });
    },

    findAll: function (param, callback) {
        Mongo._get_bulk(entrySchema, param, function (data) {
            return callback(data);
        });
    },

    findOne: function (param, callback) {
        Mongo._get(entrySchema,param,function(data){
            return callback(data);
        });
    },

    findRandom: function(param,callback){
        Mongo._get_random(entrySchema,param,function(data){
           return callback(data);
        });
    },

    search: function (param,callback){
        var options = {}
        if(param.from) options.from = param.from
        if(param.size) options.size = param.size
        if(param.sort) options.sort = param.sort
        if(param.aggs) options.aggs = param.aggs
        Mongo._search(entrySchema,param.query,options,function(data){
            return callback(data);
        })
    }
};

module.exports = EntryModel;

