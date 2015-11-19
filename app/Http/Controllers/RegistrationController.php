<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ClientRequest;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Redis;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(ClientRequest $request)
    {
        $user = User::where('nickname', $request->get('nickname'))->first();
        if($user->exists()) {
            return json_encode($user);
        } else {
            return Response::json('{"error": "This nickname is already used."}', 422);
        }
    }

    public function login(Request $request)
    {

    }


}
