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

    $this->createOrder = ['destination_id' => $this->destination->id, 'user_id' => $this->user->id, 'status' => 'approved'];

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

    it('Should update a order', function () {
        $order = Order::factory()->create(['finished' => false, ...$this->createOrder]);
        $response = $this->put("/api/v1/admin/order/{$order->id}", [
            'status' => 'canceled',
            'finished' => false,
        ]);

        $response->assertStatus(200);

        expect($response['data']['id'])->toBe($order->id);
        expect($response['data']['status'])->toBe('canceled');
        expect($response['data']['finished'])->toBe(false);
    });

    it('Should update a order finish', function () {
        $order = Order::factory()->create(['finished' => false, ...$this->createOrder]);
        $response = $this->put("/api/v1/admin/order/{$order->id}", [
            'status' => 'canceled',
            'finished' => true,
        ]);

        $response->assertStatus(200);
        expect($response['data']['id'])->toBe($order->id);
        expect($response['data']['status'])->toBe('approved');
        expect($response['data']['finished'])->toBe(true);
    });

    it('Should not update a order it already finished', function () {
        $order = Order::factory()->create(['finished' => true, ...$this->createOrder]);
        $response = $this->put("/api/v1/admin/order/{$order->id}", [
            'status' => 'canceled',
            'finished' => false,
        ]);

        $response->assertStatus(400);
    });
});
