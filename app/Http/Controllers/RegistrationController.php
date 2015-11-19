<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Redis;
use App\User;
use GeoIP;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        if (preg_match('/^[a-z\d_-]{3,15}$/i', $request->get('nickname'))) {
            $user = User::where('nickname', $request->get('nickname'))->first();
            if (is_null($user)) {


                $location = GeoIP::getLocation();

                $user = new User;
                $user->nickname = $request->get('nickname');
                $user->country = $location['country'];
                $user->ip_address =$location['ip'];
                $user->save();

                return response()->json('{"status": "User registered."}', 200);
            } else {
                return response()->json('{"error": "This nickname is already used."}', 422);
            }
        } else {
            return response()->json('{"error": "This nickname is invalid. Nickname can contain between 3-15 alphanumeric characters and underscore(_)."}', 422);
        }

    }

    public function login(Request $request)
    {
        $user = User::where('nickname', $request->get('nickname'))->first();
        if (!empty($user)) {

            return json_encode($user);
        } else {
            return response()->json('{"error": "User not found."}', 404);
        }

    }

}
