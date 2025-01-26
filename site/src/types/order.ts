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
};

export type OrderResponse = {
  data: Order[];
  links: Links;
  meta: Meta;
};

export type OrderFilters = {
  page: number;
  id?: string;
  name?: string;
  status?: Pick<Order, "status">;
  departure_date?: string;
  arrive_date?: string;
};

export type CreateOrder = {
  arrive_date: string;
  departure_date: string;
  destination_id: string;
};
