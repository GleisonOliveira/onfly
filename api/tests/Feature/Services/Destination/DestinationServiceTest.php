<?php

use App\Models\AdmUser;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;

uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->admUser = AdmUser::factory()->create();

    $this->actingAs($this->admUser, 'api');
});

describe('destinations', function () {
    it('Should get a destination list', function () {
        $response = $this->get("/api/v1/destination");

        $response->assertStatus(200);

        expect(count($response['data']))->toBeGreaterThan(1);
    });
});
