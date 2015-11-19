<?php

namespace App\Http\Controllers;

use App\Country;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use GeoIP;

use App\Http\Requests\PlayerRequest;

class RegistrationController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(PlayerRequest $request)
    {
        $user = new User;

        $user->nickname = $request->get('nickname');

        $location = GeoIP::getLocation();
        $countryId = Country::where('code',$location['isoCode'])->first()->id;
        $user->country_id = $countryId;
        $user->ip_address =$location['ip'];
        $user->save();

        return response()->json($user);
    }

}
