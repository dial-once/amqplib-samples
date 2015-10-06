var amqp = require('amqplib');

amqp.connect(require('./config.json').amqp.connection_string).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    
    var simpleMessageQueue = ch.assertQueue('queue:simple:hello', {durable: false});
    
    simpleMessageQueue = simpleMessageQueue.then(function() {
      return ch.consume('queue:simple:hello', function(msg) {
        console.log(" [x] Received '%s'", msg.content.toString());
      }, {noAck: true});
    });
    
    return simpleMessageQueue.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).then(null, console.warn);