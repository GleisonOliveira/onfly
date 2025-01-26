<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'arrive_date' => $this->arrive_date->format('d/m/Y H:i'),
            'departure_date' => $this->departure_date->format('d/m/Y H:i'),
            'status' => $this->status,
            'finished' => $this->finished,
            'user' => new UserResource($this->user),
            'destination' => new DestinationResource($this->destination),
        ];
    }
}
