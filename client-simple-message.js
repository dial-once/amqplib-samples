var amqp = require('amqplib');

amqp.connect(require('./config.json').amqp.connection_string).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  conn.createChannel().then(function(ch) {
    var msg = 'Hello!';

    return ch.assertQueue('queue:simple:hello', {durable: false})
      .then(function() {
        ch.sendToQueue('queue:simple:hello', new Buffer(msg));
        console.log(" [x] Sending '%s'", msg);
        return ch.close();
      });
  });
}).then(null, console.warn);