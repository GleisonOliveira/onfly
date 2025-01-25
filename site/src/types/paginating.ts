export type Links = {
  first: string;
  last: string;
  prev?: string;
  next?: string;
};

type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Meta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};
