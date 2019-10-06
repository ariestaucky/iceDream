<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/login','AuthenticationController@login')->name('login');


Route::group(['middleware' => ['guest:api']], function () {
    Route::post('login', 'AuthenticationController@login');
    Route::post('register', 'AuthenticationController@register');
});

Route::group(['middleware' => ['auth:api', 'Header']], function() {
    Route::get('logout', 'AuthenticationController@logout');
    Route::post('check', 'AuthenticationController@check');

    Route::post('addproduct', 'ProductController@add');
    Route::post('editproduct/{id}', 'ProductController@update');
    Route::delete('deleteproduct/{id}', 'ProductController@delete');
    Route::post('additem', 'ItemController@add');
    Route::post('edititem/{id}', 'ItemController@update');
    Route::delete('deleteitem/{id}', 'ItemController@delete');

    Route::get('user', 'UserController@index');
    Route::get('user/{id}', 'UserController@show');
});

Route::get('product', 'ProductController@product');
Route::get('product/{id}', 'ProductController@show');
Route::get('item', 'ItemController@item');
Route::get('item/{id}', 'ItemController@show');