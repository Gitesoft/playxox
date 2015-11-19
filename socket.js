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
    delete lobby[user.id];
    redis.set('lobby', JSON.stringify(lobby));
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
    var user_id = null;

    console.log("connected");

    socket.on('joinlobby', function (user) {
        user_id = user.id;
        console.log('joined to lobby | user:' + user.id + ',type:' + user.type);
        addUserToLobby(user);
        //printLobby();
    });

    socket.on('quitlobby', function (user) {
        console.log('leaving lobby | user:' + user.id + ',type:' + user.type);
        removeUserFromLobby(user);
        //printLobby();
    });

    socket.on('disconnect', function () {
        if (user_id !== null)
            removeUserFromLobby({id: user_id});

        //printLobby();

        console.log("disconnected");
    });
});

console.log("Listening on port 3000");
server.listen(3000);