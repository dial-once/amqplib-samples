var consumerOptions = {
  url: require('./config.json').amqp.connection_string,
  queue: 'auth:oauth:is_auth',
  processMessage: function(msg) {
    return new Buffer(new Date().toISOString());
  }
};

require('amqp-rpc-factory').consumer.create(consumerOptions).run();