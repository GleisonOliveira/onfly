<?php

use App\Jobs\SendOrderUpdateEmailJob;
use App\Mail\OrderUpdated;
use App\Models\Destination;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use LaracraftTech\LaravelUsefulAdditions\Traits\RefreshDatabaseFast;

uses(
    RefreshDatabaseFast::class,
);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->destination = Destination::factory()->create();
});

describe('SendOrderUpdateEmailJob', function () {
    test('Should send and email', function () {
        Mail::fake();

        $order = Order::factory()->create([
            'user_id' => $this->user->id,
            'destination_id' => $this->destination->id,
        ]);

        $job = new SendOrderUpdateEmailJob($order);
        $job->handle();

        Mail::assertSent(OrderUpdated::class);
    });
});
