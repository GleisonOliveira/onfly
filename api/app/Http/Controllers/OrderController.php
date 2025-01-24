<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserOrderFilters;
use App\Http\Requests\UserOrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\Order\OrderService;
use Illuminate\Http\Request;
use Nette\NotImplementedException;

class OrderController extends Controller
{
    public function __construct(private readonly OrderService $orderService) {}

    /**
     * List user orders
     * 
     * @response Illuminate\Http\Resources\Json\AnonymousResourceCollection<Illuminate\Pagination\LengthAwarePaginator<OrderResource>>
     */
    public function index(Request $request, UserOrderFilters $userOrderFilters)
    {
        return OrderResource::collection(
            $this->orderService->listUserOrders($request->user('api'), $userOrderFilters)
        );
    }

    /**
     * Store a user order
     */
    public function store(Request $request, UserOrderRequest $userOrderRequest)
    {
        /**
         * @status 201
         */
        return new OrderResource(
            $this->orderService->addUserOrder($request->user('api'), $userOrderRequest)
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        return new OrderResource(
            $this->orderService->getUserOrder($request->user('api'), $id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        throw new NotImplementedException('Not implemented');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        throw new NotImplementedException('Not implemented');
    }
}
