var _config = require('config.json')('./config/_app.json');

var Connector = {
    _redis: null,
    _mongo: null,
    _elastic: null,
    _rabbit: null,
    /**
     * @return {null}
     */
    
    MongoDB: function(){
        if(Connector._mongo == null){
            var mongoose = require('mongoose');
            Connector._mongo = mongoose.connection;
            Connector._mongo.on('error',console.error);
            Connector._mongo.once('open', function(){console.log('Mongodb ready...')});
            var url = 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db;
            mongoose.Promise = global.Promise;
            mongoose.connect(url);
        }

        return Connector._mongo;
    },

    RabbitMQ: function(){
        if(Connector._rabbit == null){
            var rabbit = require('amqplib');
            Connector._rabbit = rabbit.connect('amqp://'+_config.rabbit.host+':'+_config.rabbit.port, console.log('Rabbit is alive'));
        }
        return Connector._rabbit;
    },

    Redis: function(){
        if(Connector._redis == null){
            var redis = require('redis');
            Connector._redis = redis.createClient();
            Connector._redis.on('ready',function(){console.log('Redis ready...')});
            Connector._redis.on('error', function(){console.log('Unable to connect to Redis')});
        }
        return Connector._redis;
    },

    ElasticSearch: function(){
        if (Connector._elastic == null){
            var es = require('elasticsearch');
            Connector._elastic = new es.Client({host:_config.elastic.host+':'+_config.elastic.port, log: 'trace'});
            Connector._elastic.ping({requestTimeout: Infinity}, function(error){
                if (error){
                    console.trace('Elasticsearch cluster is down');
                }else{
                    console.log('Elasticsearch is running...');
                }
            })
        }
        return Connector._elastic;
    }

  }
module.exports = Connector;