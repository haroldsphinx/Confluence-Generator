var restify = require('restify');
var _config = require('config.json')('./config/_app.json');
var apiNode = require('./dao/ApiNodeDAO');
var api_url = _config.app_base+_config.api._url;
var resp    = require('./dao/Response');
var entryModel = require('./model/_EntryModel');
var Redis = require('./libraries/Redis.js');
var Rabbit = require('./libraries/RabbitMQ');
var Elastic = require('./libraries/Elastic');



var server = restify.createServer({
    name: _config.app_name,
    version: _config.app_version
});

var resp = function(res,data){
    res.header("Access-Control-Allow-Origin","*");
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(data));
     
};

server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(_config.api._port, function(){
    console.log('%s listening at %s ', server.name, server.url+api_url);

});

server.get(api_url+'/entries/fetch', function(req, res, next){
    var param = req.params;
    apiNode.load_all_entries(param, function(response){
        resp(res,response);
    });
});

server.post(api_url+'/test', function(req, res, err){  
    var name = req.body.name;
    if (!name){
        err.message = 'Name missing';
        res.status(500).json({
            status:false,
            response:'Bad Request',
            err:'Invalid data input',
            error_reason: [err.message]
        })
    }else{
        entryModel.save({name: req.body.name}, function(response){
            
            return res.json({response})
        })
    }
})

server.post(api_url+'/testRedis', function(req, res, err){
    var redis = require('redis');
    var connect = redis.createClient('127.0.0.1', '6379');
    connect.on('connect', function(){
        console.log('redis handshake completed');
    connect.on('error', console.log(error))
    })
    // var name = req.body.name;
    // Redis.set_key(name, function(err, data){
    //     res.send('saved to redis');
    //     if (err) console.log(err);
    // });

})