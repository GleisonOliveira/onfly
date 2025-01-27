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
            'finished' => 'boolean|required',
            'status' => [Rule::in(['approved', 'canceled']), 'required_if:finished,false'],
        ];
    }

    public function messages()
    {
        return [
            'finished.boolean' => 'O valor finished deve ser um booleano',
            'finished.required' => 'O valor finished é obrigatório',
            'status.in' => 'O statues é inválido',
            'status.required_if' => 'O campo status é obrigatório quando o campo finished é falso',
        ];
    }
}
