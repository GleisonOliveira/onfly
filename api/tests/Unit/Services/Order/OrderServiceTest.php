<?php

use App\Http\Requests\UserOrderFilters;
use App\Http\Requests\UserOrderRequest;
use App\Models\Destination;
use App\Models\Order;
use App\Models\User;
use App\Services\Order\OrderService;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use function Pest\Laravel\assertDatabaseHas;

uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->departureDate = '2025-05-01 00:00:00';
    $this->arriveDate = '2025-05-02 00:00:00';

    $this->user = User::factory()->create();
    $this->destination = Destination::factory()->create();
    $this->order = Order::factory()->for($this->destination)->for($this->user)->create([
        'status' => 'pending',
        'departure_date' => $this->departureDate,
        'arrive_date' => $this->arriveDate,
    ]);
    $this->orderService = new OrderService();
    $this->userOrderRequest = $this->mock(UserOrderRequest::class);
    $this->userOrderFilters = $this->mock(UserOrderFilters::class);
    $this->orderData = [
        'departure_date' => $this->departureDate,
        'arrive_date' => $this->arriveDate,
        'destination_id' => $this->destination->id
    ];
});

describe('Order', function () {
    test('Should save a new order', function () {
        $this->userOrderRequest->expects('validated')->andReturn($this->orderData);

        $order = $this->orderService->addUserOrder($this->user, $this->userOrderRequest);

        assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pending'
        ]);
    });

    test('Should return a order', function () {
        $order = $this->orderService->getUserOrder($this->user, $this->order->id);

        expect($order->id)->toBe($this->order->id);
    });

    test('Should return a order list', function () {
        $this->userOrderFilters->expects('validated')->andReturn([]);

        $orders = $this->orderService->listUserOrders($this->user, $this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by status', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['status' => 'pending']);

        $orders = $this->orderService->listUserOrders($this->user, $this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by departure_date', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['departure_date' => $this->departureDate]);

        $orders = $this->orderService->listUserOrders($this->user, $this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by arrive_date', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['arrive_date' => $this->arriveDate]);

        $orders = $this->orderService->listUserOrders($this->user, $this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by destination_id', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['destination_id' => $this->destination->id]);

        $orders = $this->orderService->listUserOrders($this->user, $this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should throws exception when order is not found', function () {
        $this->orderService->getUserOrder($this->user, str()->uuid());
    })->throws(NotFoundHttpException::class);
});

describe('Order admin', function () {
    test('Should return a order list', function () {
        $this->userOrderFilters->expects('validated')->andReturn([]);

        $orders = $this->orderService->listAdmUserOrders($this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by status', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['status' => 'pending']);

        $orders = $this->orderService->listAdmUserOrders($this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by departure_date', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['departure_date' => $this->departureDate]);

        $orders = $this->orderService->listAdmUserOrders($this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by arrive_date', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['arrive_date' => $this->arriveDate]);

        $orders = $this->orderService->listAdmUserOrders($this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });

    test('Should return a order list filtering by destination_id', function () {
        $this->userOrderFilters->expects('validated')->andReturn(['destination_id' => $this->destination->id]);

        $orders = $this->orderService->listAdmUserOrders($this->userOrderFilters);

        expect($orders[0]->id)->toBe($this->order->id);
    });
});
