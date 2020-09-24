<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/articles', 'ArtikelController@index');
Route::post('/article/store', 'ArtikelController@store');
Route::get('/article/edit/{id}', 'ArtikelController@getArticle');
Route::get('/article/{id}', 'ArtikelController@getArticle');
Route::put('/article/{id}', 'ArtikelController@update');
Route::delete('/article/delete/{id}', 'ArtikelController@delete');