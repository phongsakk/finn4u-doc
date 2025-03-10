import axios from "axios";
import { api } from "@utils/api";
import {
  ApiLoginRequest,
  ApiRefreshTokenRequest,
} from "@/types/api/request/auth";

export const apiLogin = async (payload: ApiLoginRequest) => {
  const url = api.external("/v1/admin/login");
  const response = await axios.post(url, payload);
  return response;
};

export const apiRefreshToken = async (payload: ApiRefreshTokenRequest) => {
  const url = api.external("/v1/auth/refresh-token");
  const response = await axios.post(url, payload);
  return response;
};
