var Connector = require('./_Connector');
var _config = require('config.json')('./config/_app.json');

var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

var Elastic = {
    _client: Connector.ElasticSearch(),

    dropIndex: function(ind){
        return _client.indices.delete({index:ind,});
    },

    createIndex: function(ind,model){
        return _client.indices,create({index:ind, mapping:model});
    },

    addToIndex: function(ind, types, _id, data){
        return _client.index({index:ind,type:types,id:_id,body:data});
    },
    search: function(ind,query){
        return _clientInformation.search({index:ind, q:query}).then(log);
    },
    closeConnection: function(){
        _client.close();
    },
    getFromIndex: function(_id,types,ind){
        return _client.get({id:_id, index:ind, type:types}).then(log);
    },
    waitForIndexing: function(){
        log('Wait for indexing...');
        return new Promise(function(resolve){
            setTimeout(resolve,2000);
        });
    //     Promise.resolve()
    // .then(dropIndex)
    // .then(createIndex)
    // .then(addToIndex)
    // .then(getFromIndex)
    // .then(waitForIndexing)
    // .then(search)
    // .then(closeConnection)
    },


    
}

    module.exports = Elastic;

