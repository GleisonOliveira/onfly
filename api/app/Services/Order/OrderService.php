<?php

namespace App\Services\Order;

use App\Http\Requests\UserOrderFilters;
use App\Http\Requests\UserOrderRequest;
use App\Models\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class OrderService
{
    private const int RESULTS_PER_PAGE = 10;

    /**
     * List the user orders
     *
     * @param  User             $user
     * @param  UserOrderFilters $userOrderFilters
     *
     * @return void
     * @throws InternalErrorException
     */
    public function listUserOrders(
        User $user,
        UserOrderFilters $userOrderFilters
    ): LengthAwarePaginator {
        try {
            $data = $userOrderFilters->validated();
            $query = Order::with('destination')
                ->with('user')
                ->where('user_id', $user->id);

            if (!empty($data['id'])) {
                return $query->where('id', $data['id'])->paginate(self::RESULTS_PER_PAGE);
            }

            $query = $this->getFilters($query, $data);

            return $query->paginate(self::RESULTS_PER_PAGE);
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível efetuar o cadastro');
        }
    }

    /**
     * Get the user order
     *
     * @param  User   $user
     * @param  string $orderId
     *
     * @return Order
     * @throws InternalErrorException
     */
    public function getUserOrder(
        User $user,
        string $orderId
    ): Order {
        try {
            $order = Order::with('destination')
                ->with('user')
                ->where('user_id', $user->id)
                ->find($orderId);

            if (empty($order)) {
                throw new NotFoundHttpException('Pedido náo encontrado');
            }

            return $order;
        } catch (NotFoundHttpException $ex) {
            throw $ex;
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível efetuar o cadastro');
        }
    }

    /**
     * Add a new user order
     *
     * @param  User             $user
     * @param  UserOrderRequest $userOrderRequest
     *
     * @return Order
     * @throws InternalErrorException
     */
    public function addUserOrder(
        User $user,
        UserOrderRequest $userOrderRequest
    ): Order {
        try {
            return Order::create([
                ...$userOrderRequest->validated(),
                'user_id' => $user->id,
                'status' => OrderStatus::Pending
            ]);
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível efetuar o cadastro');
        }
    }

    /**
     * Get the filters used in orders query
     *
     * @param  Builder $query
     * @param  array   $data
     *
     * @return Builder
     */
    private function getFilters(Builder $query, array $data): Builder
    {
        if (!empty($data['status'])) {
            $query->where('status', $data['status']);
        }

        if (!empty($data['departure_date'])) {
            $query->where('departure_date', '>=', $data['departure_date']);
        }

        if (!empty($data['arrive_date'])) {
            $query->where('arrive_date', '<=', $data['arrive_date']);
        }

        if (!empty($data['destination_id'])) {
            $query->where('destination_id', $data['destination_id']);
        }

        return $query;
    }
}
