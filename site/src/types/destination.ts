import { Links, Meta } from "./paginating";

export type Destination = {
  id: string;
  name: string;
  airport: string;
};

export type DestinationResponse = {
  data: Destination[];
  links: Links;
  meta: Meta;
};
