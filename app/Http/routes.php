<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::group(['prefix' => 'api'], function () {
    Route::post('register', 'RegistrationController@register');
    Route::post('login', 'RegistrationController@login');
    Route::get('scores/top_players', 'ScoresController@topPlayers');
    Route::get('scores/top_countries', 'ScoresController@topCountries');

    Route::get('game/{gameId}/move', 'GameController@move');
});

Route::get('/socket', function () {
    return view('socket');
});
