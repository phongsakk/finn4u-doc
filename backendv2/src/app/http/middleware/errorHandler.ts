import { NextFunction, Response, ErrorRequestHandler, Request } from "express";
import { CustomResponse } from "../../../types/http";
import { CustomError } from "../../../types/exception";
import { ZodError } from "zod";
import { join } from "path";

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response<CustomResponse>,
  _next: NextFunction
) => {
  console.error(err);
  if (err instanceof ZodError) {
    res.status(400).json({
      status: false,
      code: 400,
      message: err.errors
        .map((e) => e.path.join(".") + " " + e.message)
        .join(", "),
    });
  } else if (err instanceof CustomError) {
    res.json({
      status: false,
      code: err.code,
      message: err.message,
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
