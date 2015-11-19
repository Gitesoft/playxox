<?php

namespace App;

use App\GameEngine\PlayerInterface;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $guarded = ['id'];


    public static function createGame(PlayerInterface $p1, PlayerInterface $p2) {
        return Game::create([
            'player1' => $p1->getPlayerId(),
            'player2' => $p2->getPlayerId(),
            'turn' => $p1->getPlayerId(),
            'state' => [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            'winner' => null
        ]);
    }

    //
    public function makeMove(PlayerInterface $player, $target) {

    }

    public function setStateAttribute(array $state) {
        $this->attributes['state'] = json_encode($state);
    }
}
