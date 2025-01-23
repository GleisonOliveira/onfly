<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\AcceptJson;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signUp']);

    Route::prefix('admin')->middleware(AcceptJson::class)->group(function () {
        Route::post('login', [AuthController::class, 'loginAdmin']);
        Route::post('signup', [AuthController::class, 'signUpAdmin']);

        Route::prefix('dashboard')->middleware('auth:api')->group(function () {
            Route::get('/', function () {
                return 'oi';
            });
        });
    });
});
