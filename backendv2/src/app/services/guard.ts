import { RequestHandler } from "express";
import { ParsedQs } from "qs";
import { ResponseStructure } from "../../types/http";
import { ParamsDictionary } from "../../types/extends";

export const guard = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
>(
  callback: RequestHandler<P, ResponseStructure<ResBody>, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResponseStructure<ResBody>, ReqBody, ReqQuery, Locals> => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
