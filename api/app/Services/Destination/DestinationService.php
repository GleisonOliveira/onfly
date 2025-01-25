<?php

namespace App\Services\Destination;

use App\Models\Destination;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Throwable;

class DestinationService
{
    private const int DEFAULT_CACHE_TTL = 600;
    
    /**
     * List the destinations
     *
     * @return LengthAwarePaginator
     * @throws InternalErrorException
     */
    public function list(int $page = 1): LengthAwarePaginator | Collection
    {
        try {
            return Cache::remember("destinations_{$page}", self::DEFAULT_CACHE_TTL, function () {
                return Destination::all();
            });
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível listar os destinos');
        }
    }
}
