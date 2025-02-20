import api from "@utils/api";
import axios from "axios";

export const login = async () => {
  const url = api("/v1/auth/login")
  const response = await axios.get(url)
  return response;
};
