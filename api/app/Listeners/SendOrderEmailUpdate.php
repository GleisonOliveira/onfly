<?php

namespace App\Listeners;

use App\Events\OrderUpdatedEvent;
use App\Jobs\SendOrderUpdateEmailJob;

class SendOrderEmailUpdate
{
    /**
     * Handle the event.
     */
    public function handle(OrderUpdatedEvent $event): void
    {
        if ($event->order->finished) {
            return;
        }

        SendOrderUpdateEmailJob::dispatch($event->order);
    }
}
