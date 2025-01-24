<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\OrderAdmController;
use App\Http\Controllers\OrderController;
use App\Http\Middleware\AcceptJson;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('destination', [DestinationController::class, 'index']);

    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signUp']);
    Route::middleware([AcceptJson::class, 'auth:api'])->group(function () {
        Route::apiResource('order', OrderController::class);
    });

    Route::prefix('admin')->middleware(AcceptJson::class)->group(function () {
        Route::post('login', [AuthController::class, 'loginAdmin']);
        Route::post('signup', [AuthController::class, 'signUpAdmin']);

        Route::middleware([AcceptJson::class, 'auth:api_admin'])->group(function () {
            Route::apiResource('order', OrderAdmController::class);
        });
    });
});
