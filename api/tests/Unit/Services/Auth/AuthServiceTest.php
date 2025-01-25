<?php

use App\Http\Requests\AdminLoginRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Resources\JWTResource;
use App\Models\AdmUser;
use App\Models\User;
use App\Services\Auth\AuthService;
use App\Services\Auth\Enums\AuthType;
use Illuminate\Validation\UnauthorizedException;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->loginRequest = $this->mock(LoginRequest::class);
    $this->signUpRequest = $this->mock(SignUpRequest::class);
    $this->admUser = ['email' => 'adm@email.com', 'password' => '12356'];
    $this->user = ['email' => 'adm@email.com', 'password' => '12356'];
});

describe('Admin Login', function () {
    test('Should throw exception when is not authorized', function () {
        $authService = new AuthService();
        $this->loginRequest->expects('validated')->andReturn(['email' => 'fake@email.com', 'password' => 12356]);

        $authService->login($this->loginRequest, AuthType::Admin);
    })->throws(UnauthorizedException::class);

    test('Should return jwt token and user', function () {
        $authService = new AuthService();

        AdmUser::create([
            ...$this->admUser,
            'name' => 'Adm'
        ]);

        $this->loginRequest->expects('validated')->andReturn($this->admUser);

        $data = $authService->login($this->loginRequest, AuthType::Admin);

        expect($data)->toBeInstanceOf(JWTResource::class);
    });
});

describe('Admin Signup', function () {
    test('Should throw exception when user exists', function () {
        $authService = new AuthService();
        $this->signUpRequest->expects('validated')->andReturn($this->admUser);

        AdmUser::create([
            ...$this->admUser,
            'name' => 'Adm'
        ]);

        $authService->signUp($this->signUpRequest, AuthType::Admin);
    })->throws(BadRequestHttpException::class);

    test('Should return jwt token and user', function () {
        $authService = new AuthService();
        $newAdmUser = ['email' => 'new@email.com', 'password' => '12356', 'name' => 'Usuario'];

        $this->signUpRequest->expects('validated')->andReturn($newAdmUser);

        $data = $authService->signUp($this->signUpRequest, AuthType::Admin);

        expect($data)->toBeInstanceOf(JWTResource::class);
    });
});

describe('User Login', function () {
    test('Should throw exception when is not authorized', function () {
        $authService = new AuthService();
        $this->loginRequest->expects('validated')->andReturn(['email' => 'fake@email.com', 'password' => 12356]);

        $authService->login($this->loginRequest, AuthType::User);
    })->throws(UnauthorizedException::class);

    test('Should return jwt token', function () {
        $authService = new AuthService();

        User::create([
            ...$this->user,
            'name' => 'Adm'
        ]);

        $this->loginRequest->expects('validated')->andReturn($this->user);

        $data = $authService->login($this->loginRequest, AuthType::User);

        expect($data)->toBeInstanceOf(JWTResource::class);
    });
});

describe('User Signup', function () {
    test('Should throw exception when user exists', function () {
        $authService = new AuthService();
        $this->signUpRequest->expects('validated')->andReturn($this->user);

        User::create([
            ...$this->user,
            'name' => 'Adm'
        ]);

        $authService->signUp($this->signUpRequest, AuthType::User);
    })->throws(BadRequestHttpException::class);

    test('Should return jwt token', function () {
        $authService = new AuthService();
        $newUser = ['email' => 'new-user@email.com', 'password' => '12356', 'name' => 'Usuario'];

        $this->signUpRequest->expects('validated')->andReturn($newUser);

        $data = $authService->signUp($this->signUpRequest, AuthType::User);

        expect($data)->toBeInstanceOf(JWTResource::class);
    });
});
