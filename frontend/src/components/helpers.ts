import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";

export const log = (text: string) => {
  console.log(
    `\x1b[32m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`
  );
};

export const apiExternalPost = async (url: string, body: object) => {
   const res = await axios.post(api.external(url), body);
   return res.data.data;
};

export const apiExternalGet = async (url: string) => {
  const res =  await axios.get(api.external(url));
  return res.data.data;
};

export const apiInternalGet = async (url: string) => {
  const res =  await axios.get(api.internal(url));
  return res.data;
};