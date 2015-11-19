<?php

namespace App;

use App\GameEngine\PlayerInterface;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use App\Country;
use JWTAuth;

class User extends Model implements AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract,
    PlayerInterface
{
    use Authenticatable, Authorizable, CanResetPassword;

    private $id;
    private $nickname;
    private $ip_address;
    private $country;
    private $timestamp;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nickname', 'country'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $appends = ['token'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    //
    public function getTokenAttribute() {
        return JWTAuth::fromUser($this);
    }

    /**
     * Playerable Interface
     */
    public function takeTurn(Game $game) {

    }

    public function makeMove(Game $game) {

    }

    public function getPlayerId() {
        return $this->attributes['id'];
    }

    public function getPlayerNick() {
        return $this->attributes['nickname'];
    }
}
