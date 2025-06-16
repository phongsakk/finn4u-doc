import { safeNumber } from "../utils/data";

export const env = {
    PORT: safeNumber(process.env.PORT, 3000),
    
}