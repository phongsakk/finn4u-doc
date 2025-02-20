import { CreateAssetRequest } from "@/types/api/request/asset";
import api from "@utils/api";
import axios, { AxiosError } from "axios";

export const getAssets = async () => {
  const url = api("/v1/asset");
  const response = await axios.get(url);
  return response;
};

export const createAsset = async (payload: CreateAssetRequest) => {
  const url = api("/v1/asset");
  const response = await axios.post(url, payload);
  return response;
};
