var express = require('express');
var app = express();

var publisherOptions = {
  standalone: true,
  debugLevel: 2,
  replyTimeOutInterval: 10000,
  url: require('./config.json').amqp.connection_string,
  queue: 'queue:ack:hello'
};

var client = require('amqp-rpc-factory').publisher.create(publisherOptions);

app.get('/', function(req, res) {
  client.publish(new Buffer('Hello'))
  .then(function publishSuccess(response) {
    res.send(response);
  })
  .catch(function publishError(err) {
    res.status(501).send(err);
  });
});

app.listen(1337);