var app = require('http').createServer(handler)

var publisherOptions = {
  replyTimeOutInterval: 10000,
  url: require('./config.json').amqp.connection_string,
  queue: 'auth:oauth:is_auth'
};

var client = require('amqp-rpc-factory').publisher.create(publisherOptions);

function handler(req, res) {
  client.publish(new Buffer('login:password'))
  .then(function(msg) {
    res.end(msg);
  })
  .catch(function(err){
    res.writeHead(501).end(err);
  });
}

app.listen(1337);