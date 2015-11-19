<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */


    public function run()
    {
        foreach (range(1, 10) as $index) {
            factory(App\User::class, 50)->create()->each(function($u) {
                $u->posts()->save(factory(App\Post::class)->make());
            });
        }
    }


}
