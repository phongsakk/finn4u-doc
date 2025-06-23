import { sign, verify } from "jsonwebtoken";
import { AuthPayload } from "../types/http";

const ACCESS_TOKEN_KEY = "finn4u-secret-access";
const REFRESH_TOKEN_KEY = "finn4u-secret-refresh";

export const generateAccessToken = (claims: AuthPayload): string => {
  return sign(claims, ACCESS_TOKEN_KEY, {
    expiresIn: "5m",
  });
};

export const generateRefreshToken = (claims: AuthPayload): string => {
  return sign(claims, REFRESH_TOKEN_KEY, {
    expiresIn: "1d",
  });
};

export const parseAccessToken = (token: string): AuthPayload | null => {
  return verify(token, ACCESS_TOKEN_KEY) as AuthPayload;
};
