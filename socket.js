/**
 * Created by ilter on 18.11.2015.
 */
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('new connection');

  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});

console.log("Listening on port 3000");
server.listen(3000);