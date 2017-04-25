var Connector = require('./_Connector');
var _config = require('config.json')('./config/_app.json');

var RabbitMQ = {

    _client: Connector.RabbitMQ(),

    publish: function(data,queue,callback){
        this._client.then(function(conn) {
            return conn.createChannel();
        }).then(function(ch) {
            return ch.assertQueue(queue,{durable: true, noAck: false}).then(function(ok) {
                var response = ch.sendToQueue(queue, new Buffer(JSON.stringify(data)));
                return callback(response);
            });
        }).catch(console.warn);
    },
    
    consume: function(queue,callback){
        this._client.then(function(conn) {
            return conn.createChannel();
        }).then(function(ch) {
            return ch.assertQueue(queue).then(function(ok) {
                return ch.consume(queue, function(msg) {
                    if (msg !== null) {
                        ch.ack(msg);
                        callback(msg.content.toString());
                    }
                });
            });
        }).catch(console.warn);
    }
};

module.exports = RabbitMQ;