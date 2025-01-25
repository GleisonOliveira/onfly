export type Login = {
  email: string;
  password: string;
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type LoginSuccessResponse = {
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
};

export type LoginErrorResponse = {
  data: {
    message: string;
    errors: {
      [key: string]: string[];
    };
  };
};
