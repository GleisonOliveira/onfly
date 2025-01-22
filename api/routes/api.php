<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\AcceptJson;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->middleware(AcceptJson::class)
    ->group(function () {
        Route::prefix('dashboard')->middleware('auth:api')->group(function () {
            Route::get('/', function () {
                return 'oi';
            });
        });
        Route::post('login', [AuthController::class, 'loginAdmin']);
    });
