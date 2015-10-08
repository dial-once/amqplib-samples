var express = require('express');
var app = express();

var publisherOptions = {
  replyTimeOutInterval: 10000,
  url: require('./config.json').amqp.connection_string,
  queue: 'auth:oauth:is_auth'
};

var client = require('amqp-rpc-factory').publisher.create(publisherOptions);

app.get('/', function(req, res) {
  client.publish(new Buffer('login:password'))
  .then(function(msg) {
    res.send(msg);
  })
  .catch(function(err){
    res.status(501).send(err);
  });
});

app.listen(1337);