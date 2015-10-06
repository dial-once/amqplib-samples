var amqp = require('amqplib');

amqp.connect(require('./config.json').amqp.connection_string).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  
  conn.createChannel().then(function(ch) {
    var q = 'queue:simple:hello';
    var msg = 'Hello World!';

    var ok = ch.assertQueue(q, {durable: false});
    
    return ok.then(function(_qok) {
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  });
}).then(null, console.warn);