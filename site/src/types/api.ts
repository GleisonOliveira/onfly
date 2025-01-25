export type AxiosRequestResponse<T, E> = Promise<[T?, E?, unknown?]>;
export type ErrorResponse = {
  data: {
    message: string;
    errors: {
      [key: string]: string[];
    };
  };
};
