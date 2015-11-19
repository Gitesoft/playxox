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
    // Don't put this! This is already declared in app.blade.php in views folder
    var XoxConfig = {
        url: "{{ url() }}"
    };

    var user_id = (new Date()).getTime();

    var socket = io(XoxConfig.url + ':3000',{ query: "user_id=" + user_id });


    socket.emit('joinlobby',{
        type: 'random'
    });

    socket.on('private-' + user_id, function(payload) {
        console.log('message from private channel');
        console.log(payload);
        document.getElementById('message').innerText = payload.message;
    });


</script>
</body>
</html>