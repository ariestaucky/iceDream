<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Lcobucci\JWT\Parser;
use App\User;

class AuthenticationController extends Controller
{
    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        if($user) {
            $tokenobj = $user->createToken('Token');
            $token = $tokenobj->accessToken;
            $response = [
                'token' => $token,
                'user' => $user
            ];
            return response()->json($response, 201);
        } else {
            $response = 'Something went wrong. Please try again in a moment';
            return response()->json($response, 201);
        }
    }

    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $tokenobj = $user->createToken('Token');
                $token = $tokenobj->accessToken;
                $response = [
                    'token' => $token,
                    'user' => $user
                ];
                return response()->json($response, 201);
            } 
            else {
                $response = 'Wrong Password';
                return response()->json($response, 201);
            }
        } 
        else {
            $response = 'User doesn\'t exist';
            return response()->json($response, 201);
        }
        
    }

    public function logout()
    {
        if(Auth::check()) {
            // $isUser = $request->user()->token()->revoke();
            $isUser = auth()->user()->token()->revoke();
            if($isUser){
                $success['message'] = "Successfully logged out.";
                return response()->json($success, 201);
            }
            else{
                $error = "Something went wrong.";
                return response()->json($error, 201);
            }
        }
    }

    public function check(Request $request) {
        $value = $request->bearerToken();
        $header  = (new Parser())->parse($value)->getHeader('jti');
        if(Auth::check()) {
            $id = auth()->user()->token()->find($header);
            $user_id = $id->user_id;
            $user = User::findorFail($user_id);
        } else {
            $response = 'User doesn\'t exist';
            return response()->json($response, 201);
        }
        $response = [
            'token' => $value,
            'user' => $user
        ]; 
        return response()->json($response, 201);
    }
}
