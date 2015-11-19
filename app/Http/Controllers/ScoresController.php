<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Score;
use DB;
class ScoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function topPlayers()
    {
        //
        $topPlayers =DB::table('users')->select('nickname','total_score')->orderBy('total_score', 'desc')->take(10)->get();
        return response()->json( $topPlayers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function topCountries()
    {
        $topCountries =DB::table('users')->select('nickname','total_score')->orderBy('total_score', 'desc')->take(10)->get();
        return response()->json( $topCountries);
    }


}
