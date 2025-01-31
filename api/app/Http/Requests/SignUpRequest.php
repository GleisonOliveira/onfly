<?php

namespace App\Http\Requests;
class SignUpRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'email|required',
            'password' => 'required|min:8|max:16',
            'name' => 'required|min:3|max:255',
        ];
    }

    public function messages()
    {
        return [
            'email' => 'O e-mail deve ser umm endereço de e-mail válido',
            'email.required' => 'O e-mail é obrigatório',
            'password.required' => 'A senha é obrigatória',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres',
            'password.max' => 'A senha deve ter no máximo 16 caracteres',
            'name.required' => 'O Nome é obrigatóri',
            'name.min' => 'O Nome deve ter no mínimo 8 caracteres',
            'name.max' => 'O Nome deve ter no máximo 16 caracteres',
        ];
    }
}
