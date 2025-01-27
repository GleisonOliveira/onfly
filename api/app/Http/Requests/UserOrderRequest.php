<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use DateTime;

class UserOrderRequest extends BaseRequest
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
            'departure_date' => 'required|date_format:Y-m-d H:i:s|after:' . Carbon::parse(new DateTime())->startOfDay(),
            'arrive_date' => 'required|date_format:Y-m-d H:i:s|after:' . Carbon::parse($this->data('departure_date', new DateTime())),
            'destination_id' => 'required|exists:destinations,id',
        ];
    }

    public function messages()
    {
        return [
            'departure_date.required' => 'A data de partida é obrigatória',
            'departure_date.date_format' => 'A data de partida precisa ser uma data válida',
            'departure_date.after' => 'A data de partida precisa ser uma após a data atual',
            'arrive_date.required' => 'A data de partida é obrigatória',
            'arrive_date.date_format' => 'A data de partida precisa ser uma data válida',
            'arrive_date.after' => 'A data de partida precisa ser pelo menos 30 minutos após a data de partida',
            'destination_id.required' => 'O destino é obrigatório',
            'destination_id.exists' => 'O destino é obrigatório',
            'user_id.required' => 'O usuário é obrigatório',
            'user_id.exists' => 'O usuário é obrigatório',
        ];
    }
}
