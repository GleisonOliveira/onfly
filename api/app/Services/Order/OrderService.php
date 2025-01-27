<?php

namespace App\Services\Order;

use App\Exceptions\InvalidUUID;
use App\Http\Requests\UserOrderFilters;
use App\Http\Requests\UserOrderRequest;
use App\Models\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Str;
use Throwable;

class OrderService
{
    private const int RESULTS_PER_PAGE = 10;

    private const array ORDER_FILTERS = [
        'status' => '=',
        'departure_date' => '>=',
        'arrive_date' => '<=',
        'destination_id' => '=',
    ];

    /**
     * List the user orders
     *
     * @param  User             $user
     * @param  UserOrderFilters $userOrderFilters
     *
     * @return LengthAwarePaginator
     * @throws InternalErrorException
     */
    public function listUserOrders(
        User $user,
        UserOrderFilters $userOrderFilters
    ): LengthAwarePaginator {
        try {
            $data = $userOrderFilters->validated();
            $query = Order::with('destination')
                ->select("*", "orders.id as orderId")
                ->with('user')
                ->where('user_id', $user->id);

            $query = $this->getFilters($query, $data)->orderBy('departure_date', 'desc');

            return $query->paginate(self::RESULTS_PER_PAGE);
        } catch (InvalidUUID) {
            throw new InternalErrorException('O ID fornecido não é valido');
        } catch (Throwable $ex) {
            throw new InternalErrorException('Não foi possível listar os pedidos');
        }
    }

    /**
     * List the user orders
     *
     * @param  UserOrderFilters $userOrderFilters
     *
     * @return LengthAwarePaginator
     * @throws InternalErrorException
     */
    public function listAdmUserOrders(
        UserOrderFilters $userOrderFilters
    ): LengthAwarePaginator {
        try {
            $data = $userOrderFilters->validated();
            $query = Order::with('destination')
                ->select("*", "orders.id as orderId")
                ->with('user');

            $query = $this->getFilters($query, $data);

            return $query->paginate(self::RESULTS_PER_PAGE);
        } catch (InvalidUUID) {
            throw new InternalErrorException('O ID fornecido não é valido');
        } catch (Throwable) {
            throw new InternalErrorException('Não foi possível listar os pedidos');
        }
    }

    /**
     * Get the user order
     *
     * @param  User   $user
     * @param  string $orderId
     *
     * @return Order
     * @throws InternalErrorException|NotFoundHttpException
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
     * @throws InvalidUUID
     */
    private function getFilters(Builder $query, array $data): Builder
    {
        $orderFilters = self::ORDER_FILTERS;

        array_walk($orderFilters, function ($filter, $key) use ($query, $data) {
            if (!empty($data[$key])) {
                $query->where($key, $filter, $data[$key]);
            }
        });

        if (!empty($data['id']) && !Str::isUuid($data['id'])) {
            throw new InvalidUUID("ID inválido");
        }

        if (!empty($data['id'])) {
            $query->where('orders.id', $data['id']);
        }

        if (!empty($data['name'])) {
            $query
                ->join('users', 'orders.user_id', '=', 'users.id')
                ->join('destinations', 'orders.destination_id', '=', 'destinations.id')
                ->where(function ($query) use ($data) {
                    $query
                        ->where('users.name', 'ILIKE', "%{$data['name']}%")
                        ->orWhere('destinations.name', 'ILIKE', "%{$data['name']}%");
                });
        }

        return $query->orderBy("orders.departure_date", "asc");
    }
}
