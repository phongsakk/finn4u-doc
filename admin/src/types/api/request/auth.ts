import z from "zod";
import { apiLoginRequestSchema } from "@libs/validate/auth";

export type ApiLoginRequest = z.infer<typeof apiLoginRequestSchema>;