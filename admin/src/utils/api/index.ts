import { ApiLoginRequest } from "@/types/api/request/auth";
import _api from "@setting/api";
import axios from "axios";

export const api = (path: string) => {
  const baseUrl = _api.base.trim();
  const trimmedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${trimmedBaseUrl}/${trimmedPath}`;
};

export const apiLogin = async (payload: ApiLoginRequest) => {
  const response = await axios.post(api("/v1/auth/login"), payload);
  return response;
};
