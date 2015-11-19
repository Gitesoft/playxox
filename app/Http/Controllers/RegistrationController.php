<?php

namespace App\Http\Controllers;

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
        $user->country = $location['country'].'/'.$location['isoCode'];
        $user->ip_address =$location['ip'];
        $user->save();

        return response()->json($user);
    }

    public function login(Request $request)
    {
        $user = User::where('nickname', $request->get('nickname'))->first();
        if (!empty($user)) {

            return json_encode($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }

    }

}
