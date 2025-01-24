<?php

namespace App\Http\Controllers;

use App\Http\Resources\DestinationResource;
use App\Services\Destination\DestinationService;


class DestinationController extends Controller
{
    public function __construct(private readonly DestinationService $destinationService) {}

    /**
     * List the destinations
     * 
     * @response Illuminate\Http\Resources\Json\AnonymousResourceCollection<Illuminate\Pagination\LengthAwarePaginator<DestinationResource>>
     */
    public function index()
    {
        return DestinationResource::collection(
            $this->destinationService->list()
        );
    }
}
