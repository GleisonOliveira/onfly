<?php

namespace App\Services\Destination;

use App\Models\Destination;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Throwable;

class DestinationService
{
    private const int RESULTS_PER_PAGE = 10;

    /**
     * List the destinations
     *
     * @return LengthAwarePaginator
     * @throws InternalErrorException
     */
    public function list(): LengthAwarePaginator
    {
        try {
            return Destination::paginate(self::RESULTS_PER_PAGE);
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível listar os destinos');
        }
    }
}
