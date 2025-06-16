export type CustomResponse<T = any> = {
  status: boolean;
  message: string;
  code: number;
  data?: T;
};

export type CustomPagingResponse<T = any> = {
  status: boolean;
  message: string;
  code: number;
  data?: T;
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
