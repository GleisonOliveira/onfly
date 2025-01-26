<?php

namespace App\Http\Requests;

use App\Models\Enums\OrderStatus;
use Illuminate\Validation\Rule;

class UserOrderFilters extends BaseRequest
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
            'id' => 'uuid',
            'status' => [Rule::enum(OrderStatus::class)],
            'destination_id' => 'uuid',
            'departure_date' => 'date_format:Y-m-d H:i:s',
            'arrive_date' => 'date_format:Y-m-d H:i:s',
            'name' => 'min:0|max:255',
        ];
    }
}
