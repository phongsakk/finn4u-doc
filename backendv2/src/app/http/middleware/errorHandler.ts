import { NextFunction, Response, ErrorRequestHandler, Request } from "express";
import { ResponseStructure } from "../../../types/http";
import { CustomError } from "../../../types/exception";
import { ZodError } from "zod";
import { join } from "path";
import { PrismaClientKnownRequestError } from "../../../../generated/prisma/runtime/library";
import { safeString } from "../../../utils/data";

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response<ResponseStructure>,
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
  } else if (err instanceof PrismaClientKnownRequestError) {
    // console.log(1, err.batchRequestIdx);
    // console.log(2, err.clientVersion);
    // console.log(3, err.code);
    // console.log(4, err.message);
    // console.log(5, err.meta);
    // console.log(6, err.name);
    res.status(400).json({
      status: false,
      code: 400,
      message: safeString(err.meta?.cause, err.message),
    });
  } else if (err instanceof CustomError) {
    res.status(err.code).json({
      status: false,
      code: err.code,
      message: err.message,
    });
  } else if (err instanceof Error) {
    console.log(err.name, err.message, err.stack);

    res.status(500).json({
      status: false,
      code: 500,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export default errorHandler;
