<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Game;

class GameEngineTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testHorizontalWonCheck() {

        $case1 = [["X", "X", "X"], [null, null, null], [null, null, null]];

        $g = new Game();
        $this->assertTrue($g->isWon($case1, 'X'));
    }

    public function testVerticalWonCheck() {

        $case1 = [[null, null, "X"], [null, null, "X"], [null, null, "X"]];

        $g = new Game();
        $this->assertTrue($g->isWon($case1, 'X'));
    }

    public function testDiagonal1WonCheck() {

        $case1 = [[null, null, "X"], [null, "X", null], ["X", null, null]];

        $g = new Game();
        $this->assertTrue($g->isWon($case1, 'X'));
    }

    public function testDiagonal2WonCheck() {

        $case1 = [["X", null, null], [null, "X", null], [null, null, "X"]];

        $g = new Game();
        $this->assertTrue($g->isWon($case1, 'X'));
    }

    public function testNoWinCheck() {

        $case1 = [["X", null, "X"], [null, null, null], [null, null, null]];

        $g = new Game();
        $this->assertFalse($g->isWon($case1, 'X'));
    }

}
