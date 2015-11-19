<!DOCTYPE html>
<html>
<head>
    <title>XOX</title>
    <link rel="stylesheet" type="text/css" href="{{ elixir('vendor.css') }}">
</head>
<body>

<div class="container">
    test: <div id="message"></div>

</div>

<script type="text/javascript" src="{{ elixir('vendor.js') }}"></script>
<script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
<script>
    var socket = io('http://xox.game:3000');


    socket.on('game-f3495h34h39', function(payload) {
        console.log(payload);
        document.getElementById('message').innerText = payload.message;
    });


</script>
</body>
</html>