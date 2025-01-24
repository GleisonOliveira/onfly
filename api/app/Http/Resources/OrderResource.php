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
            'arrive_date' => $this->arrive_date->format('Y-m-d H:i:s'),
            'departure_date' => $this->arrive_date->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'finished' => $this->finished,
            'user' => new UserResource($this->user),
            'destination' => new DestinationResource($this->destination),
        ];
    }
}
