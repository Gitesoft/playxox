<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Game;
use App\GameEngine\MoveException;
use App\Events\GameMove;

use JWTAuth;

class GameController extends ApiController
{

    public function __construct() {
        $this->middleware('auth');
    }

    public function move($gameId, Request $request)
    {
        $player = JWTAuth::parseToken()->authenticate();
        $game = Game::findOrFail($gameId);

        try {
            $game->makeMove($player, $request->get('target'));
        } catch(MoveException $e) {
            return $this->errorResponse($e->getMessage());
        }

        event(new GameMove($game));
        return response()->json('ok');
    }

}
