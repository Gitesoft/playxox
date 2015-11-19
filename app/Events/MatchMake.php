<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\GameEngine\PlayerInterface;

class MatchMake extends Event implements ShouldBroadcast
{
    use SerializesModels;

    private $player1;
    private $player2;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PlayerInterface $player1, PlayerInterface $player2)
    {
        $this->player1 = $player1;
        $this->player2 = $player2;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        $channels = [];

        if($this->player1->id) {
            $channels[] = 'private-'.$this->player1->id;
        }

        if($this->player2->id) {
            $channels[] = 'private-'.$this->player2->id;
        }

        return $channels;
    }
}
