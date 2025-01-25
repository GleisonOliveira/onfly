import { User } from "./user";

export type Login = {
  email: string;
  password: string;
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
};

export type LoginType = "login" | "sign";
