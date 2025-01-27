import { Destination } from "./destination";
import { Links, Meta } from "./paginating";
import { User } from "./user";

export type Order = {
  id: string;
  arrive_date: string;
  departure_date: string;
  status: "pending" | "canceled" | "approved";
  finished: boolean;
  destination: Destination;
  user: User;
  loading: boolean | null;
  finishing: boolean | null;
  canceling: boolean | null;
};

export type OrderResponse = {
  data: Order[];
  links: Links;
  meta: Meta;
};

export type OrderFilters = {
  page?: number;
  id?: string;
  name?: string;
  status?: Pick<Order, "status"> | "all" | undefined;
  departure_date?: string;
  arrive_date?: string;
};

export type CreateOrder = {
  arrive_date: string;
  departure_date: string;
  destination_id: string;
};

interface OrderFinished {
  finished: boolean;
}
interface UpdateOrderFinished extends OrderFinished {
  finished: true;
}

interface UpdateOrderNotFinished extends OrderFinished {
  finished: false;
  status: "approved" | "canceled";
}

export type OrderUpdate = UpdateOrderFinished | UpdateOrderNotFinished;

export type OrderStatuses = {
  finished: boolean;
  status: "canceled" | "approved";
  index: number;
};
