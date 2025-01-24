<?php

use App\Models\Destination;
use App\Services\Destination\DestinationService;
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
    });
});
