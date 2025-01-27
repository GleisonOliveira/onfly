<?php

namespace App\Listeners;

use App\Events\UserCreatedEvent;
use App\Jobs\SendUserCreatedEmailJob;

class UserCreatedEmail
{
    /**
     * Handle the event.
     */
    public function handle(UserCreatedEvent $event): void
    {
        SendUserCreatedEmailJob::dispatch($event->user);
    }
}
