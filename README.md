# amqplib-samples
Basic AMQP-Node sample to use simple messaging and message with ack/callback.
Inspired from https://github.com/squaremo/amqp.node/tree/master/examples/tutorials


# service.js
This is the service logic, and handle two kind of queues: one with a callback and the other without. Simply display the value of received/sent messages.

# client-simple-message.js
This is the client logic with a simple fire-and-forget message into the queue.

# client-callback.js
This is the client logic with a message and a ack message received from the main message.