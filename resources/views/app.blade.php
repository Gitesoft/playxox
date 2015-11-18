<!DOCTYPE html>
<html>
    <head>
        <title>XOX</title>
        <link rel="stylesheet" type="text/css" href="{{ elixir('vendor.css') }}">
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>

        <script type="text/javascript" src="{{ elixir('vendor.js') }}"></script>
        <script type="text/javascript" src="{{ elixir('app.js') }}"></script>
    </body>
</html>