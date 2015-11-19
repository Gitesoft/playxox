/**
 * Created by ilter on 18.11.2015.
 */
var server = require('http').createServer();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

// Redis subscription
redis.psubscribe('*', function(err, count) {});

redis.on('pmessage', function(subscribed, channel, payload) {
    console.log("received new message on: " + channel);
    payload = JSON.parse(payload);
    io.emit(channel, payload.data);
});

io.on('connection', function(socket) {
    console.log('new connection');

    socket.on('event', function(data) {

    });


    socket.on('disconnect', function() {
        console.log("disconnected");
    });
});

console.log("Listening on port 3000");
server.listen(3000);