/**
 * Created by oluwasegunmatthew on 30/06/16.
 */
var mongoose = require('mongoose')
    , mongoosastic = require('mongoosastic');
var _config = require('config.json')('./config/_app.json')
var _collection = _config.mongodb.collections;


var Schema = mongoose.Schema;

var entrySchema = new Schema({
    name:{type:String},
    date_added:{type:Date, default:Date.now}
});

// entrySchema.plugin(mongoosastic, {
//     hosts: [_config.elastic.host+":"+_config.elastic.port]
// })

var entryModel = mongoose.model(_collection.entry, entrySchema);
module.exports = entryModel;