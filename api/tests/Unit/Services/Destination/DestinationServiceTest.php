<?php

use App\Services\Destination\DestinationService;
use Illuminate\Support\Facades\Cache;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;


uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->destinationService = new DestinationService();

});

describe('Destination', function () {
    test('Should return a destination list', function () {

        $destinations = $this->destinationService->list();

        expect($destinations[0])->not->toBeNull();

        $cache = Cache::get('destinations');

        expect($cache)->not->toBeNull();
    });
});
