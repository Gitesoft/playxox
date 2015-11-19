<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::drop('scores');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::create('scores', function ($table) {
            $table->increments('id');
            $table->string('player_1');
            $table->string('player_2');
            $table->string('winnerId')->nullable();
            $table->timestamps();
        });
    }
}
