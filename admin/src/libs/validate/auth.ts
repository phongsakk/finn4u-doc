import dayjs from "dayjs";
import { boolean, number, object, string } from "zod";

export const apiLoginRequestSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const apiLoginResponseSchema = object({
  status: boolean().default(false),
  message: string(),
  code: number().int(),
  data: object({
    access_expires_in: string().transform((val) => dayjs(val)),
    access_token: string(),
    refresh_expires_in: string().transform((val) => dayjs(val)),
    refresh_token: string(),
  }),
});

export const apiRefreshTokenRequestSchema = object({
  refresh_token: string({ required_error: "Refresh token is required" })
    .min(1, "Refresh token is required")
    .max(255, "Refresh token must be less than 255 characters"),
});

export const apiRefreshTokenResponseSchema = apiLoginResponseSchema;
