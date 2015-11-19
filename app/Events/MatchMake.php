<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\GameEngine\PlayerInterface;
use App\Game;

class MatchMake extends Event implements ShouldBroadcast
{
    use SerializesModels;

    private $player1;
    private $player2;

    private $game;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PlayerInterface $player1, PlayerInterface $player2)
    {
        $this->player1 = $player1;
        $this->player2 = $player2;

        $this->game = Game::createGame($this->player1, $this->player2);
    }

    public function broadcastWith() {
        return $this->game;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        $channels = [
            'private-'.$this->player1->getPlayerId(),
            'private-'.$this->player2->getPlayerId()
        ];

        return $channels;
    }
}
