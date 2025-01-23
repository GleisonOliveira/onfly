<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Services\Auth\AuthService;
use App\Services\Auth\Enums\AuthType;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    /**
     * Admin login
     *
     * @unauthenticated
     * @response array{access_token: string, token_type: string}
     */
    public function loginAdmin(LoginRequest $loginRequest)
    {
        return $this->authService->login($loginRequest, AuthType::Admin);
    }

    /**
     * Admin signup
     *
     * @unauthenticated
     * @response array{access_token: string, token_type: string}
     */
    public function signUpAdmin(SignUpRequest $signUpRequest)
    {
        return $this->authService->signUp($signUpRequest, AuthType::Admin);
    }

    /**
     * User login
     *
     * @unauthenticated
     * @response array{access_token: string, token_type: string}
     */
    public function login(LoginRequest $loginRequest)
    {
        return $this->authService->login($loginRequest);
    }

    /**
     * User signup
     *
     * @unauthenticated
     * @response array{access_token: string, token_type: string}
     */
    public function signUp(SignUpRequest $signUpRequest)
    {
        return $this->authService->signUp($signUpRequest, AuthType::User);
    }
}
