import z from "zod";
import { apiLoginRequestSchema, apiRefreshTokenRequestSchema } from "@libs/validate/auth";

export type ApiLoginRequest = z.infer<typeof apiLoginRequestSchema>;
export type ApiRefreshTokenRequest = z.infer<typeof apiRefreshTokenRequestSchema>;