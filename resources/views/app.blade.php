<!DOCTYPE html>
<html>
    <head>
        <title>XOX</title>
        <link rel="stylesheet" type="text/css" href="{{ elixir('vendor.css') }}">
    </head>
    <body ng-app="xox">

        <div class="container text-center text-muted" ng-if="false">
            <h1><i class="fa fa-circle-o-notch fa-spin"></i> Loading...</h1>
        </div>
        <div class="container" ng-cloak>
            
        </div>

        <script type="text/javascript" src="{{ elixir('vendor.js') }}"></script>
        <script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>