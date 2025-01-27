<?php

namespace App\Services\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Resources\JWTResource;
use App\Models\AdmUser;
use App\Models\User;
use App\Services\Auth\Enums\AuthType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Log the user based on credentials
     *
     * @param  LoginRequest $loginRequest
     * @param  AuthType     $type
     *
     * @return JWTResource
     * @throws UnauthorizedException
     */
    public function login(LoginRequest $loginRequest, AuthType $type = AuthType::User): JWTResource
    {
        try {
            $credentials = $loginRequest->validated();

            if (! $token = Auth::guard($type->value)->attempt($credentials)) {
                throw new UnauthorizedException('Usuário ou senha inválido, por favor, verifique as informações e tente novamente.');
            }

            $user = Auth::guard($type->value)->user();

            return new JWTResource([$token, $user, $type->name]);
        } catch (Throwable $ex) {
            throw new UnauthorizedException('Usuário ou senha inválido, por favor, verifique as informações e tente novamente.');
        }
    }

    /**
     * Signm the user based on credentials
     *
     * @param  SignUpRequest $signUpRequest
     * @param  AuthType     $type
     *
     * @return JWTResource
     * @throws UnauthorizedException
     */
    public function signUp(SignUpRequest $signUpRequest, AuthType $type = AuthType::User): JWTResource
    {
        try {
            $userData = $signUpRequest->validated();

            $userEntity = match ($type) {
                AuthType::User => new User,
                AuthType::Admin => new AdmUser
            };

            if ($userEntity::where('email', $userData['email'])->exists()) {
                throw new BadRequestHttpException('O usuário não está indisponível, por favor informe outro e-mail.');
            }

            $user = $userEntity::create([
                ...$userData,
                'password' => Hash::make($userData['password'])
            ]);

            $token = JWTAuth::fromUser($user);

            return new JWTResource([$token, $user, $type->name]);
        } catch (BadRequestHttpException $ex) {
            throw $ex;
        } catch (Throwable $ex) {
            throw new InternalErrorException('Não foi possível efetuar o cadastro.');
        }
    }
}
