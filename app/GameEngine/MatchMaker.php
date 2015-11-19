<?php

namespace App\GameEngine;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;

use App\GameEngine\AI\MinimaxAI;
use App\Events\MatchMake;

use App\User;
use Redis;
use Log;

class MatchMaker extends Command
{

    private $lobby;
    private $gameTypes;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lobby:listen';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Listen to redis lobby and make matches';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Listening to Redis lobby');

        $this->gameTypes = [
            'random' => 'matchRandom',
            'cpu' => 'matchAI'
        ];

        $this->listen();
    }

    protected function matchMake(PlayerInterface $p1, PlayerInterface $p2) {
        event(new MatchMake($p1, $p2));
    }

    protected function matchAI($player) {
        $user = User::find($player['id']);
        $opponent = new MinimaxAI();

        $this->matchMake($user, $opponent);
        return true;
    }

    protected function matchRandom($player) {

        $opponentPool = $this->lobby->filter(function($i) {
            return $i['type'] == 'random';
        });
        // remove self
        $opponentPool->forget($player['id']);


        if( ! $opponentPool->count()) {
            return false;
        }

        $opponent = $opponentPool->random(1);

        $user1 = User::find($player['id']);
        $user2 = User::find($opponent['id']);
        // remove user from lobby
        $this->lobby->forget($opponent['id']);

        $this->matchMake($user1, $user2);
        return true;
    }

    protected function listen() {

        while(1) {
            $jsonLobby = Redis::get('lobby');
            $this->lobby = new Collection(json_decode($jsonLobby, 1));

            if( ! $this->lobby || ! $this->lobby->count()) {
                sleep(2);
                continue;
            }

            foreach($this->lobby as $key => $player) {
                // game type not defined
                if( ! isset($this->gameTypes[$player['type']])) {
                    continue;
                }

                $this->info('Matching user #'.$player['id'].' for ' . $player['type']);
                $type = $this->gameTypes[$player['type']];

                // if match succeeds
                try {
                    if($this->$type($player)) {
                        // remove user from the lobby
                        $this->lobby->forget($key);
                    }
                } catch(\Exception $e) {
                    // failed?
                    $this->error('Failed to matchmake');
                    Log::error($e);
                }
            }
            //
            Redis::set('lobby', json_encode($this->lobby->toArray()));
            sleep(1);
        }
    }
}
