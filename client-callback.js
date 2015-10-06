var amqp = require('amqplib');

amqp.connect(require('./config.json').amqp.connection_string).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  conn.createChannel().then(function(ch) {
    var answer = function(resp) {
      console.log(' [.] Received', resp.content.toString());
    };

    ch.assertQueue('queue:ack:hello', {exclusive: false, durable: false})
      .then(function(qok) { return qok.queue; })
      .then(function(queue) {
        return ch.consume(queue, answer, {noAck: true}).then(function() { return queue; });
      })
      .then(function(queue) {
        console.log(' [x] Sending Hello');
        return ch.sendToQueue('queue:ack:hello', new Buffer('Hello'), {
          correlationId: 'random_id', replyTo: queue
        });
      });
    });
}).then(null, console.warn);