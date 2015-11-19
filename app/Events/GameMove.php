<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Game;

class GameMove extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $game;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Game $game)
    {
        //
        $this->game = $game;
    }

    public function broadcastWith() {
        return $this->game->toArray();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['game-'.$this->game->id];
    }
}