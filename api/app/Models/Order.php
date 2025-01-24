<?php

namespace App\Models;

use App\Models\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'departure_date',
        'arrive_date',
        'destination_id',
        'user_id',
        'finished',
        'status',
    ];

    protected $casts = [
        'status' => OrderStatus::class,
        'departure_date' => 'datetime',
        'arrive_date' => 'datetime',
    ];

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
