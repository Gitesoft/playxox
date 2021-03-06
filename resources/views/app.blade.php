<!DOCTYPE html>
<html>
    <head>
        <title>XOX</title>
        <link rel="stylesheet" type="text/css" href="{{ elixir('vendor.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ elixir('css/all.css') }}">
    </head>
    <body ng-app="xox">


        <div class="container text-center text-muted" ng-if="false">
            <h1><i class="fa fa-circle-o-notch fa-spin"></i> Loading...</h1>
        </div>
        <div class="container" ng-cloak>
            <div ng-view></div>
        </div>

        <script type="text/javascript" src="{{ elixir('vendor.js') }}"></script>
        <script>
            var XoxConfig = {
                url: "{{ url() }}",
                port: 8888
            };
        </script>
        <script type="text/javascript" src="{{ elixir('js/all.js') }}"></script>
        <script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
    </body>
</html>