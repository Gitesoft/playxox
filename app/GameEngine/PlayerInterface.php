<?php

namespace App\GameEngine;

use App\Game;

interface PlayerInterface
{
    public function takeTurn(Game $game); //
    public function getPlayerId();
    public function getPlayerNick();
}