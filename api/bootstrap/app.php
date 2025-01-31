<?php

use App\Http\Middleware\AcceptJson;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->priority([
            AcceptJson::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (UnauthorizedException|InternalErrorException $ex, Request $request) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 401);
        });
        $exceptions->render(function (BadRequestHttpException $ex, Request $request) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 400);
        });
        $exceptions->render(function (AuthenticationException $ex, Request $request) {
            return response()->json([
                'message' => 'Não autenticado'
            ], 401);
        });
        $exceptions->render(function (NotFoundHttpException $ex, Request $request) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 404);
        });

    })->create();
