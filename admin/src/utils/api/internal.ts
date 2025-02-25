import axios from "axios"
import { api } from "@utils/api";
import { ApiRefreshTokenRequest } from "@/types/api/request/auth";

export const apiRefreshToken = async (payload: ApiRefreshTokenRequest) => {
    const url = api.internal("/api/auth/refresh");
    const response = await axios.post(url, payload);
    return response;
  };
  