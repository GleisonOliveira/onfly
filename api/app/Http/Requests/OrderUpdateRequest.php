<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class OrderUpdateRequest extends BaseRequest
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
            'finish' => 'boolean|required',
            'status' => [Rule::in(['approved', 'canceled']), 'accepted_if:finish,false'],
        ];
    }

    public function messages()
    {
        return [
            'finish.boolean' => 'O valor finish deve ser um booleano',
            'finish.required' => 'O valor finish é obrigatório',
            'status.in' => 'O statues é inválido',
            'status.accepted_if' => 'O campo status é obrigatório quando o campo finish é falso',
        ];
    }
}
