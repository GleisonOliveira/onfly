<?php

namespace App\Services\Auth;

use App\Http\Requests\AdminLoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;

class AuthService
{
    public function loginAdmin(AdminLoginRequest $adminLoginRequest)
    {
        $credentials = $adminLoginRequest->validated();

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            throw new UnauthorizedException('Usuário ou senha inválido');
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}
