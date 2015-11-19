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

    public function testEmptyNickname() {
        // Empty nickname
        $this->post('/api/register', ['nickname' => ''])->assertResponseStatus(422);
    }

    public function testActuallyEmptyNickname() {
        // Empty nickname
        // İki boş karakter diye bir kullanıcı adı olamaz
        $this->post('/api/register', ['nickname' => '  '])->assertResponseStatus(422);
    }

    public function testInvalidCharacters() {
        // ?, *, /, - gibi karakterlerden oluşamaz (regex kullanılacak, valid username?)
        $this->post('/api/register', ['nickname' => '?'])->assertResponseStatus(422);
        $this->post('/api/register', ['nickname' => '*'])->assertResponseStatus(422);
    }

    public function testTooShort() {
        // En az üç karakterden oluşmalı
        $this->post('/api/register', ['nickname' => 'a'])->assertResponseStatus(422);
        $this->post('/api/register', ['nickname' => 'ab'])->assertResponseStatus(422);
    }

    public function testSuccessfulRegistration() {
        // Valid nickname
        $this->post('/api/register', ['nickname' => 'aozisik'])->assertResponseOk();
    }

    public function testUserRegistration()
    {
        // Valid nickname
        $this->post('/api/register', ['nickname' => 'aozisik'])->assertResponseOk();
        // Invalid (non-unique) nickname
        $this->post('/api/register', ['nickname' => 'aozisik'])->assertResponseStatus(422);
    }
}
