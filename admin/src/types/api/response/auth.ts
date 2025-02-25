import { apiLoginResponseSchema } from "@libs/validate/auth"
import z from "zod"

export type ApiLoginResponse = z.infer<typeof apiLoginResponseSchema>;