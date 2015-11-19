<?php

namespace App;

use App\GameEngine\PlayerInterface;
use Illuminate\Database\Eloquent\Model;
use App\GameEngine\MoveException;
use App\User;

class Game extends Model
{
    protected $guarded = ['id'];
    protected $hidden = ['player1', 'player2'];
    protected $appends = ['players'];

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

    public function getStateAttribute() {
        return json_decode($this->attributes['state'], 1);
    }

    public static function inflatePlayerFromId($id) {
        if(is_numeric($id)) {
            return User::find($id);
        }

        if(class_exists($id) and is_subclass_of($id, PlayerInterface::class)) {
            return new $id;
        }
    }

    public static function playerArray(PlayerInterface $player, $char) {
        return [
            'id' => $player->getPlayerId(),
            'char' => $char,
            'nickname' => $player->getPlayerNick()
        ];
    }

    public function getPlayersAttribute() {

        $p1 = Game::inflatePlayerFromId($this->attributes['player1']);
        $p2 = Game::inflatePlayerFromId($this->attributes['player2']);

        return [
            Game::playerArray($p1, 'X'),
            Game::playerArray($p2, 'O'),
        ];
    }
}
