<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JWTResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'access_token' => $this->resource[0],
            'token_type' => 'bearer',
            'user' => new UserResource($this->resource[1]),
            'type' => $this->resource[2]
        ];
    }
}
