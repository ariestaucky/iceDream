<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::findorFail($id);

        return response()->json($user, 201);
    }
}
