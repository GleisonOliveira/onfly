<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminLoginRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    /**
     * Admin login
     *
     * @unauthenticated
     * @response array{access_token: string, token_type: string}
     */
    public function loginAdmin(AdminLoginRequest $adminLoginRequest)
    {
        return $this->authService->loginAdmin($adminLoginRequest);
    }
}
