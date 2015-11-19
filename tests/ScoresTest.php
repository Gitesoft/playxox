<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ScoresTest extends TestCase
{

    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testTopUsers()
    {
        $u1 = factory(App\User::class)->create(['nickname' => 'user1', 'total_score' => 252]);
        $u2 = factory(App\User::class)->create(['nickname' => 'user2', 'total_score' => 200]);
        $u3 = factory(App\User::class)->create(['nickname' => 'user3', 'total_score' => 150]);

        $this->get('/api/scores/top_players')->seeJsonEquals([
            ["nickname" =>  "user1", "total_score" =>  252 ],
            ["nickname" =>  "user2", "total_score" =>  200 ],
            ["nickname" =>  "user3", "total_score" =>  150 ]
        ]);
    }

    public function testTopCountries() {

        factory(App\Country::class)->create(['name' => 'Country 1']);
        factory(App\Country::class)->create(['name' => 'Country 2']);

        $u1 = factory(App\User::class)->create(['nickname' => 'user1', 'total_score' => 252, 'country_id' => '1']);
        $u2 = factory(App\User::class)->create(['nickname' => 'user2', 'total_score' => 200, 'country_id' => '2']);
        $u3 = factory(App\User::class)->create(['nickname' => 'user3', 'total_score' => 500, 'country_id' => '2']);

        $this->get('/api/scores/top_countries')->seeJsonEquals([
            ["name" =>  "Country 2", "total_score" =>  700 ],
            ["name" =>  "Country 1", "total_score" =>  252 ],
        ]);
    }
}