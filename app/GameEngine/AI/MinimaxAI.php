<?php

namespace App\GameEngine\AI;

use App\GameEngine\PlayerInterface;
use App\Game;

class MinimaxAI implements PlayerInterface
{
    public function takeTurn(Game $game)
    {
        // TODO: Implement takeTurn() method.
    }

    public function getPlayerId() {
        return MinimaxAI::class;
    }

    public function getPlayerNick() {
        return 'Gite Bot';
    }
}