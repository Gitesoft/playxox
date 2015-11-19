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
        //
        $state = $this->state;
        $target = explode(',', $target);

        if( ! $target || ! is_array($target)) {
            throw new MoveException('Invalid move');
        }

        $row = intval($target[0]);
        $column = intval($target[1]);

        if(($row < 0 or $row > 2) or ($column < 0 or $column > 2)) {
            throw new MoveException('Invalid move');
        }

        if( ! is_null($this->state[$row][$column])) {
            throw new MoveException('Target already occupied');
        }

        if($this->turn != $player->getPlayerId()) {
            throw new MoveException('It is not your turn');
        }

        $char = $this->players[$player->getPlayerId()]['char'];
        $state[$row][$column] = $char;

        // is won?
        if($this->isWon($this->state, $char)) {
            $this->winner = $player->getPlayerId();
        }

        if($this->isOver($this->state)) {
            $this->winner = '-';
        }

        $this->state = $state;

        $players = $this->players;
        unset($players[$player->getPlayerId()]);
        $next = array_shift($players);

        $this->turn = $next['id'];
        $this->save();
    }

    public function checkColums(array $columns, $char) {
        $equal = true;
        $prev = null;

        foreach($columns as $col) {
            //
            if($col != $char) {
                $equal = false;
            }

            if( ! is_null($prev) && $prev != $col) {
                $equal = false;
            }

            $prev = $col;
        }

        return $equal;
    }

    public function isWon(array $state, $char) {

        // check columns horizontally
        foreach($state as $row) {
            //
            if($this->checkColums($row, $char)) {
                return true;
            }
        }

        // check columns vertically
        for($cIndex=0;$cIndex<=2;$cIndex++) {

            $columns = [];

            for($rIndex=0;$rIndex<=2;$rIndex++) {
                $columns[] = $state[$rIndex][$cIndex];
            }

            if($this->checkColums($columns, $char)) {
                return true;
            }
        }

        // check columns diagonally
        if($this->checkColums([$state[0][0], $state[1][1], $state[2][2]], $char)) {
            return true;
        }

        if($this->checkColums([$state[0][2], $state[1][1], $state[2][0]], $char)) {
            return true;
        }

        return false;
    }

    public function isOver($state) {

        foreach($state as $row) {
            foreach($row as $column) {
                if(is_null($column)) {
                    return false;
                }
            }
        }

        return true;
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
            $p1->getPlayerId() => Game::playerArray($p1, 'X'),
            $p2->getPlayerId() => Game::playerArray($p2, 'O'),
        ];
    }
}
