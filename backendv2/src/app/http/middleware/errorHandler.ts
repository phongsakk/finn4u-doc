import { NextFunction, Response, ErrorRequestHandler, Request } from "express";
import { CustomResponse } from "../../../types/http";
import { CustomError } from "../../../types/exception";

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response<CustomResponse>,
  _next: NextFunction
) => {
  console.error(err);
  if (err instanceof CustomError) {
    res.json({
        status: false,
        code: err.code,
        message: err.message
    });
  } else if (err instanceof Error) {
    res.json({
      status: false,
      code: 500,
      message: err.message,
    });
  } else {
    res.json({
      status: false,
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export default errorHandler;
