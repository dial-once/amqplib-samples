var amqp = require('amqplib');

amqp.connect(require('./config.json').amqp.connection_string).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    /**
     * [simpleMessageQueue description]
     * @type {[type]}
     */
    ch.assertQueue('queue:simple:hello', {durable: false})
      .then(function() {
        return ch.consume('queue:simple:hello', function(msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
        }, {noAck: true});
      })
      .then(function(_consumeOk) {
        console.log(' [*] Waiting for messages. To exit press CTRL+C');
      });

    /**
     * [ackMessageQueue description]
     * @type {[type]}
     */
    ch.assertQueue('queue:ack:hello', {durable: false})
      .then(function() {
        ch.prefetch(1);
        return ch.consume('queue:ack:hello', reply);
      })
      .then(function() {
        console.log(' [*] Awaiting RPC requests');
      });

    function reply(msg) {
      console.log(' [x] Received RPC request %s', msg.content.toString());
      ch.sendToQueue(msg.properties.replyTo, 
        new Buffer('World'),
        { correlationId: msg.properties.correlationId });
      ch.ack(msg);
    }

    return true;
  });
}).then(null, console.warn);