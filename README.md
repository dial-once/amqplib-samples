# amqplib-samples
Basic AMQP-Node sample to use simple messaging and message with ack/callback.
Inspired from https://github.com/squaremo/amqp.node/tree/master/examples/tutorials

-----------------------
## Requirements
Have a local or remote RabbitMQ (if remote change the config.json to put the rabbitmq connexion string)

-----------------------

##Files description
### service.js
This is the service logic, and handle two kind of queues: one with a callback and the other without. Simply display the value of received/sent messages.

### client-simple-message.js
This is the client logic with a simple fire-and-forget message into the queue.

### client-callback.js
This is the client logic with a message and a ack message received from the main message.

### http-gateway.js
Http gateway sample, it listen on port 1337 and on each request send a message to the auto-worker client, then print the response to the http client.

### socket-gateway.js
Socket gateway sample, it listen on port 1337 and prints an interface and when user clicks on the input button, send the request to the auth worker and print the result in the interface.

### auth-worker.js
This is a simple worker returning always true