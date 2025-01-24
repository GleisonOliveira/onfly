<?php

use App\Models\Destination;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->index();
            $table->string('airport')->unique()->index();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->datetime('departure_date')->index();
            $table->datetime('arrive_date')->index();
            $table->uuid('destination_id');
            $table->uuid('user_id');
            $table->enum('status', ['pending', 'approved', 'canceled'])->default('pending');
            $table->boolean('finished')->default(false);
            $table->timestamps();

            $table->foreign('destination_id')->references('id')->on('destinations')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Destination::insert([
            [
                'id' => Str::uuid(),
                'name' => 'São Paulo',
                'airport' => 'GRU',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Aeroporto Internacional de Brasília',
                'airport' => 'BSB',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Aeroporto Internacional do Rio de Janeiro',
                'airport' => 'GIG',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('destinations');
    }
};
