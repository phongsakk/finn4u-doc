import { RequestHandler } from "express";
import { ParsedQs } from "qs";
import { CustomResponse } from "../../types/http";
import { ParamsDictionary } from "../../types/extends";

export const guard = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
>(
  callback: RequestHandler<P, CustomResponse<ResBody>, ReqBody, ReqQuery, Locals>
): RequestHandler<P, CustomResponse<ResBody>, ReqBody, ReqQuery, Locals> => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
