import { RequestHandler } from "express";
import { ParsedQs } from "qs";
import { CustomResponse } from "./http";

export interface ParamsDictionary {
    [key: string]: string;
}

export type CustomHandler<
P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = RequestHandler<P, CustomResponse<ResBody>, ReqBody, ReqQuery, Locals>