<?php

use App\Models\AdmUser;
use App\Models\Destination;
use App\Models\Order;
use App\Models\User;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;

use function Pest\Laravel\assertDatabaseHas;

uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->departureDate = '2025-05-01 00:00:00';
    $this->arriveDate = '2025-05-02 00:00:00';

    $this->user = User::factory()->create();
    $this->admUser = AdmUser::factory()->create();
    $this->destination = Destination::factory()->create();
    $this->order = Order::factory()->for($this->destination)->for($this->user)->create([
        'status' => 'pending',
        'departure_date' => $this->departureDate,
        'arrive_date' => $this->arriveDate,
    ]);

    $this->orderData = [
        'departure_date' => $this->departureDate,
        'arrive_date' => $this->arriveDate,
        'destination_id' => $this->destination->id
    ];

    $this->actingAs($this->user, 'api');
    $this->actingAs($this->admUser, 'api_admin');
});

describe('Order', function () {
    it('Should create a new order', function () {

        $response = $this->post('/api/v1/order', $this->orderData);

        $response->assertStatus(201);

        assertDatabaseHas('orders', [
            'id' => $response['data']['id'],
            'status' => 'pending'
        ]);
    });

    it('Should get an order', function () {
        $response = $this->get("/api/v1/order/{$this->order->id}");

        $response->assertStatus(200);

        expect($response['data']['id'])->toBe($this->order->id);
    });

    it('Should get an order list', function () {
        $response = $this->get("/api/v1/order");

        $response->assertStatus(200);

        expect(count($response['data']))->toBe(1);
        expect($response['meta']['total'])->not->toBeNull();
        expect($response['meta']['current_page'])->toBe(1);
        expect($response['data'][0]['id'])->toBe($this->order->id);
    });
});

describe('Order Admin', function () {
    it('Should get an order list', function () {
        $response = $this->get("/api/v1/admin/order");

        $response->assertStatus(200);

        expect(count($response['data']))->toBe(1);
        expect($response['meta']['total'])->not->toBeNull();
        expect($response['meta']['current_page'])->toBe(1);
        expect($response['data'][0]['id'])->toBe($this->order->id);
    });
});
