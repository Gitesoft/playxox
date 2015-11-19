<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegistrationTest extends TestCase
{
    //git s
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testUserRegistration()
    {
        // Empty nickname
        $this->post('/api/register', ['nickname' => ''])->assertResponseStatus(422);

        // Valid nickname
        $this->post('/api/register', ['nickname' => 'aozisik'])->assertResponseOk();

        // Invalid (non-unique) nickname
        $this->post('/api/register', ['nickname' => 'aozisik'])->assertResponseStatus(422);
    }
}
