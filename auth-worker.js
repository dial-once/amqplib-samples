var consumerOptions = {
  url: require('./config.json').amqp.connection_string,
  queue: 'auth:is_auth',
  processMessage: function(msg) {
    console.log('Received:', msg.content);
    return true;
  }
};

require('amqp-rpc-factory').consumer.create(consumerOptions).run();