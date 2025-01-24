<?php

namespace App\Models\Enums;

enum OrderStatus: string {
    case Approved = 'approved';
    case Canceled = 'canceled';
    case Pending = 'pending';
}