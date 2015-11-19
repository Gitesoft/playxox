<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    //
    private $id;
    private $name;
    private $code;

    public $timestamps = false;
}
