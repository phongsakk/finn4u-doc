import { UnauthorizeError } from "../../../types/exception";
import { CustomHandler, CustomRequest } from "../../../types/http";
import { parseAccessToken } from "../../../utils/jwt";

export const authUser: CustomHandler = (req: CustomRequest, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new UnauthorizeError();
  }

  const bearer = authorization.split(" ")[1];
  const user = parseAccessToken(bearer);
  if (!user) {
    throw new UnauthorizeError();
  }

  req.auth = user;

  next();
};
