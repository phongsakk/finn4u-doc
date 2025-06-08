import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@setting/auth";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
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

export const statusText = (status: number) => {
  const status_label_map = [
    "รอการประเมินราคา",
    "รอร่วมลงทุน",
    "รอ Matching",
    "ขายฝากแล้ว",
  ];

  return status_label_map[status];
};

export const catchError = async (error: any) => {
  // logError("testet",error)

  if (error instanceof AxiosError) {
    // logError("testet",error.response?.data)
    return {
      status: false,
      code: error.response?.status || 500,
      data: error.response?.data || "An error occurred",
      message: error.message,
    };
  }

  return {
    status: false,
    code: 500,
    data: "Api error",
    message: "An unexpected error occurred",
  };
};

export const statusColor = (status: number) => {
  const status_color_map = ["#4E5FFA", "#FF9500", "#F04141", "#30B175"];

  return status_color_map[status];
};

export const formatNumber = (
  value: number,
  style: string = "decimal",
  currency?: string
): string => {
  if (!value) return "0";
  const options: Intl.NumberFormatOptions =
    style === "currency"
      ? { style: "currency", currency: currency || "USD" }
      : style === "percent"
      ? { style: "percent" }
      : { style: "decimal" };

  return new Intl.NumberFormat("en-US", options).format(value);
};

export const convertImage_arr = async (objectfiles: FileList) => {
  try {
    const fileArray = Array.from(objectfiles);
    const base64Images = await Promise.all(
      fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      })
    );

    const resizedImages = await Promise.all(
      base64Images.map((base64) => resizeBase64Image({ base64 }))
    );
    return resizedImages || [];
  } catch (error) {
    return [];
  }
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

export const numberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  updateState: (newData: any) => void,
  field: keyof any
) => {
  const value = e.target.value;

  const regex = /^(\d+(\.\d*)?|\.\d+)$/;

  if (regex.test(value) || value === "") {
    updateState({ [field]: value });
  }
};

type DefaultFormatDate = "D MMMM BBBB" | "DD/MM/BBBB HH:mm" | (string & {});

export const ToDateThai = (
  txt: any,
  format: DefaultFormatDate = "D MMMM BBBB"
) => {
  dayjs.locale("th");
  return dayjs(txt, "DD/MM/YYYY HH:mm:ss").format(format);
};

export const parseFormData = (formData: FormData) => {
  const result: Record<string, any> = {};

  for (const [fullKey, value] of formData.entries()) {
    const match = fullKey.match(/^([^\[]+)\[(\d+)\]\[(\w+)\]$/);
    if (match) {
      const [, arrayKey, indexStr, field] = match;
      const index = parseInt(indexStr, 10);

      if (!result[arrayKey]) {
        result[arrayKey] = [];
      }

      if (!result[arrayKey][index]) {
        result[arrayKey][index] = {};
      }

      result[arrayKey][index][field] = value;
    } else {
      // flat key fallback
      result[fullKey] = value;
    }
  }

  return result;
};

export const CheckAuth = async () => {
  const session = await auth();
  if (!session) {
    return { status: false, code: 401, message: "Not authenticated" };
  }
  return {
    status: true,
    role: session?.user?.role ?? "",
    headerToken: {
      headers: {
        Authorization: "Bearer " + (session.user?.accessToken ?? ""),
      },
    },
  };
};

export const prefix = (num: number) => {
  var name = "";
  switch (num) {
    case 1:
      name = "นาย";
      break;
    case 2:
      name = "นาง";
      break;
    case 3:
      name = "นางสาว";
      break;
  }

  return name;
};
