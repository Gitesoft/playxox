var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
  //mix.sass('app.scss');
  //
  var bowerPath = '../../../vendor/bower_components/';

  mix.scripts([
    bowerPath + 'angular/angular.min.js',
    bowerPath + 'angular-socket-io/socket.min.js'
    
  ], 'public/js/vendor.js')

    .version([
      'public/js/vendor.js'
    ]);
});
