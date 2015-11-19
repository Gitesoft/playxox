<?php

namespace App\Listeners;

use App\Events\GameMove;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class GameStateListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  GameMove  $event
     * @return void
     */
    public function handle(GameMove $event)
    {
        //

    }
}
