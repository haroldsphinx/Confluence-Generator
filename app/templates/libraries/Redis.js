var Connector = require('../libraries/_Connector');

var Redis = {
    _client: Connector.Redis(),

    set_key: function(data,callback) {
        this._client.set(data.key, data.value,function(err,data){
            if(err) return callback(false);
            else  return callback(true);
        });
    },

    get_key: function(key,callback){
        this._client.get(key,function(err,data){
            if(err) return callback(false);
            else  return callback(data);
        });
    },

    incr_key: function(key,callback){
      this._client.incr(key,function(err,data){
          return callback(data);
      })
    },

    _key_generator: function(data){
        var keys = Object.keys(data);
        return keys[0]+':'+data[keys[0]];
    },

    check_set: function(key,callback){
        this._client.exists(this._key_generator(key), function(err,data){
            if(err) return callback(false);
            else{
                if(data === 1) return callback(true);
                else return callback(false);
            }
        });
    },

    check_set_field: function (key, field){

    },

    add_set: function (dset,callback){
        var key = this._key_generator(dset.key);
        this._client.hmset(key,dset.data,function(err,data){
            if(err) return callback(err);
            else{
                if(dset.expire){
                    Redis._client.expire(key,dset.expire);
                }
                return callback(true);
            }
        });
    },

    get_set: function(key,field,callback){
        var key = this._key_generator(key);
        this._client.hgetall(key, function(err,data){
            if(err) return callback(false);
            else {
                if(data) {
                    if (field) {
                        if(data[field])
                            data = data[field];
                        else
                            data = false;
                        return callback(data);
                    }else
                        return callback(data);
                }else{
                    return callback(false);
                }
            }
        });
    },

    count_set: function(key,callback){
        var key = this._key_generator(key);
        this._client.hlen(key, function(err,data){
            if(err) return false;
            else {
                return callback(data);
            }
        });
    },

    rename_set: function(old_str, new_str,callback){
        this._client.rename(this._key_generator(old_str),this._key_generator(new_str),function(err,reply){
            if(err) return false;
            else
                return callback(reply);
        });
    },

    delete_set: function(key,callback){
        this._client.del(this._key_generator(key),function(err,reply){
            if(err) return false;
            else
                return callback(reply);
        });
    }
}

module.exports = Redis;