import { LoginForm } from "@/types/api/request/auth";
import api from "@utils/api";
import axios from "axios";

export const login = async (payload: LoginForm) => {
  const url = api("/v1/auth/login");
  const response = await axios.get(url);
  return response;
};
