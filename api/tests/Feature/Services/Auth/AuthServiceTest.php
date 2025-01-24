<?php

use App\Models\AdmUser;
use App\Models\User;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;

uses(
    RefreshDatabaseFast::class,
);

describe('Admin Login', function () {
    it('Should return jwt when login is successfull', function () {
        $admUser = ['email' => 'adm@email.com', 'password' => '12356789'];

        AdmUser::create([
            ...$admUser,
            'name' => 'Adm'
        ]);

        $response = $this->post('/api/v1/admin/login', $admUser);

        $response->assertStatus(200);
        expect($response['data']['access_token'])->not->toBeNull();
    });

    it('Should return bad request when data is invalid', function () {
        $response = $this->post('/api/v1/admin/login', []);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });

    it('Should return Unauthorized when data is invalid', function () {
        $response = $this->post('/api/v1/admin/login', ['email' => 'invalid@email.com', 'password' => '12356789']);

        $response->assertStatus(401);
        expect($response['message'])->not->toBeNull();
    });
});

describe('Admin Signup', function () {
    it('Should return jwt when signup is successfull', function () {
        $admUser = ['email' => 'adm@email.com', 'password' => '12356789', 'name' => 'user'];

        $response = $this->post('/api/v1/admin/signup', $admUser);

        $response->assertStatus(200);
        expect($response['data']['access_token'])->not->toBeNull();
    });

    it('Should return bad request when data is invalid', function () {
        $response = $this->post('/api/v1/admin/signup', []);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });

    it('Should return Unauthorized when user already exists', function () {
        $admUser = ['email' => 'adm@email.com', 'password' => '12356789', 'name' => 'user'];
        AdmUser::create($admUser);

        $response = $this->post('/api/v1/admin/signup', $admUser);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });
});

describe('User Login', function () {
    it('Should return jwt when login is successfull', function () {
        $user = ['email' => 'adm@email.com', 'password' => '12356789'];

        User::create([
            ...$user,
            'name' => 'Adm'
        ]);

        $response = $this->post('/api/v1/login', $user);

        $response->assertStatus(200);
        expect($response['data']['access_token'])->not->toBeNull();
    });

    it('Should return bad request when data is invalid', function () {
        $response = $this->post('/api/v1/login', []);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });

    it('Should return Unauthorized when data is invalid', function () {
        $response = $this->post('/api/v1/login', ['email' => 'invalid@email.com', 'password' => '12356789']);

        $response->assertStatus(401);
        expect($response['message'])->not->toBeNull();
    });
});

describe('User Signup', function () {
    it('Should return jwt when signup is successfull', function () {
        $user = ['email' => 'adm@email.com', 'password' => '12356789', 'name' => 'user'];

        $response = $this->post('/api/v1/signup', $user);

        $response->assertStatus(200);
        expect($response['data']['access_token'])->not->toBeNull();
    });

    it('Should return bad request when data is invalid', function () {
        $response = $this->post('/api/v1/signup', []);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });

    it('Should return Unauthorized when user already exists', function () {
        $user = ['email' => 'adm@email.com', 'password' => '12356789', 'name' => 'user'];
        User::create($user);

        $response = $this->post('/api/v1/signup', $user);

        $response->assertStatus(400);
        expect($response['message'])->not->toBeNull();
    });
});
