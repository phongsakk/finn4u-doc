import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import sharp from "sharp";
dayjs.locale("th");

export const log = (text: any, textObject?: any) => {
  if (textObject === undefined) {
    textObject = "";
  }
  console.log(
    `\x1b[32m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`,
    textObject
  );
};

export const logError = (text: any, textObject?: any) => {
  if (textObject === undefined) {
    textObject = "";
  }
  console.log(
    `\x1b[31m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`,
    textObject
  );
};

export const apiExternalPost = async (url: string, body: object) => {
  const res = await axios.post(api.external(url), body);
  return res.data.data;
};

export const apiExternalGet = async (url: string) => {
  const res = await axios.get(api.external(url));
  return res.data.data;
};

export const apiInternalGet = async (url: string) => {
  const res = await axios.get(api.internal(url));
  return res.data;
};

export const handleNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  inputNum: (value: string) => void
) => {
  const value = e.target.value;

  const regex = /^(\d+(\.\d*)?|\.\d+)$/;

  if (regex.test(value) || value === "") {
    inputNum(value);
  }
};

export const formatDateThai = (value: Date) => {
  return dayjs(value).add(543, "year").format("DD/MM/YYYY HH:mm:ss");
};

export const resizeBase64Image = ({
  base64,
  newWidth = 529,
  newHeight = 307,
  quality = 0.7,
}: {
  base64: string;
  newWidth?: number;
  newHeight?: number;
  quality?: number;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const width = newWidth || img.width;
      const height = newHeight || img.height;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not supported");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = (error) => reject(error);
  });
};
