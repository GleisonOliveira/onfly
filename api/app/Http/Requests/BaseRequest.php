<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

abstract class BaseRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $errors = new ValidationException($validator);

        throw new HttpResponseException(
            response()->json([
                'message' => $errors->getMessage(),
                'errors' => $errors->errors()
            ], JsonResponse::HTTP_BAD_REQUEST)
        );
    }
}
