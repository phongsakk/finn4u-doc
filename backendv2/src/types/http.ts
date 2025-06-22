import { Request } from "express";
import { ParamsDictionary } from "./extends";
import { ParsedQs } from "qs";
import { NextFunction, Response as ExpressResponse } from "express";

export type CustomHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
  (
    req: CustomRequest<
      P,
      ResponseStructure<ResBody>,
      ReqBody,
      ReqQuery,
      Locals
    >,
    res: ExpressResponse<ResponseStructure<ResBody>, Locals>,
    next: NextFunction
  ):
    | void
    | Promise<void>;
};

export type ResponseStructure<T = any> = {
  status: boolean;
  message: string;
  code: number;
  data?: T;
};

export interface CustomRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  LocalsObj extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, LocalsObj> {
  auth?: AuthPayload;
}

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

export type AuthPayload = {
  user_id: number;
  email: string;
  type: string;
};
