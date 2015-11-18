var elixir = require('laravel-elixir');

elixir.config.sourcemaps = false;

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

  mix
  	.copy('vendor/bower_components/bootstrap/dist/fonts', 'public/fonts')
  	.copy('vendor/bower_components/font-awesome/fonts', 'public/fonts')
  	//
  	.styles([
  		bowerPath + 'bootstrap/dist/css/bootstrap.css',
  		bowerPath + 'font-awesome/css/font-awesome.css'
  		//
  	], 'public/vendor.css')
  	//
  	.scripts([
	    bowerPath + 'angular/angular.js',
	    bowerPath + 'angular-socket-io/socket.js'

	  ], 'public/vendor.js')

	.version([
	  'vendor.css',
	  'vendor.js'
	]);
});
