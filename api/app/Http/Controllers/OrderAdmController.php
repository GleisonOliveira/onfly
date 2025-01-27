<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderUpdateRequest;
use App\Http\Requests\UserOrderFilters;
use App\Http\Requests\UserOrderRequest;
use App\Http\Resources\OrderResource;
use App\Mail\OrderUpdated;
use App\Models\Order;
use App\Services\Order\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Nette\NotImplementedException;

class OrderAdmController extends Controller
{
    public function __construct(private readonly OrderService $orderService) {}

    /**
     * List user orders
     * 
     * @response Illuminate\Http\Resources\Json\AnonymousResourceCollection<Illuminate\Pagination\LengthAwarePaginator<OrderResource>>
     */
    public function index(UserOrderFilters $userOrderFilters)
    {
        return OrderResource::collection(
            $this->orderService->listAdmUserOrders($userOrderFilters)
        );
    }

    /**
     * Store a user order
     */
    public function store(UserOrderRequest $userOrderRequest)
    {
        throw new NotImplementedException('Not implemented');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        throw new NotImplementedException('Not implemented');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderUpdateRequest $orderUpdateRequest, Order $order)
    {
        return new OrderResource($this->orderService->update($order, $orderUpdateRequest));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        throw new NotImplementedException('Not implemented');
    }
}
