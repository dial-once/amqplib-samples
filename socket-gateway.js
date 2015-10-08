var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var publisherOptions = {
  replyTimeOutInterval: 10000,
  url: require('./config.json').amqp.connection_string,
  queue: 'auth:oauth:is_auth'
};

var client = require('amqp-rpc-factory').publisher.create(publisherOptions);


app.listen(1337);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('[ ] Client connected.');
  socket.on('event', function(msg){
    console.log('[x] Got', msg, 'from client.');
    client.publish(new Buffer('login:password'))
      .then(function(msg) {
        socket.emit('answer', msg);
      })
      .catch(function(err){
        socket.emit('answer', msg);
      });
  });
});