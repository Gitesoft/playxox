/**
 * Created by ilter on 18.11.2015.
 */
var server = require('http').createServer();
var io = require('socket.io')(server);
var Redis = require('ioredis');
//redis object for read / write
var redis = new Redis();

//redis object for laravel event subscriptions
var redisSubscribe = new Redis();
//subscription for events
redisSubscribe.psubscribe('*', function (err, count) {
});

//set empty object in lobby
var lobby = {};
redis.set('lobby', JSON.stringify(lobby));

var addUserToLobby = function (user) {
    lobby[user.id] = user;
    redis.set('lobby', JSON.stringify(lobby));
};

var removeUserFromLobby = function (user) {
    for (id in lobby) {
        if (id === user.id) {
            var index = lobby.indexOf(lobby[id]);
            lobby.splice(index, 1);
            redis.set('lobby', JSON.stringify(lobby));
        }
    }
}

var printLobby = function () {
    redis.get('lobby', function (err, obj) {
        console.log(JSON.parse(obj));
    });
}


redisSubscribe.on('pmessage', function (subscribed, channel, payload) {
    console.log("received new message on: " + channel);
    payload = JSON.parse(payload);
    io.emit(channel, payload.data);
});

io.on('connection', function (socket) {

    var handshakeData = socket.request;
    var user_id = handshakeData._query['user_id'];

    console.log('new connection | from user:' + user_id);

    socket.on('joinlobby', function (data) {

        console.log('joined to lobby | user:' + user_id + ',type:' + data.type);

        var user = {
            id: user_id,
            type: data.type
        };
        addUserToLobby(user);

        printLobby();
    });

    socket.on('disconnect', function () {
        console.log("disconnected");
    });
});

console.log("Listening on port 3000");
server.listen(3000);