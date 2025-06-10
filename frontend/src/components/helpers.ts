import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import sharp from "sharp";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
import { auth } from "@libs/auth";
import { NextResponse } from "next/server";
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
  return dayjs(value).format("DD/MM/BBBB HH:mm:ss");
};

export const convertImage = async (objectfile: File): Promise<string> => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(objectfile);

      reader.onload = async () => {
        if (typeof reader.result === "string") {
          try {
            const resizedImage = await resizeBase64Image({
              base64: reader.result,
            });
            resolve(resizedImage || "");
          } catch (error) {
            console.error("Error resizing image:", error);
            resolve("");
          }
        } else {
          resolve("");
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
    });
  } catch (error) {
    console.error("Error in convertImage:", error);
    return "";
  }
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

export const searchProvince = (
  pro_id: string,
  setDistrict: (
    districts: { id: string; pro_id: string; name: string }[]
  ) => void,
  districts: { id: string; pro_id: string; name: string }[]
) => {
  const dis = districts.filter((x: any) => x.pro_id === Number(pro_id)) || [];

  setDistrict(dis);
};

export const searchDistrict = (
  dis_id: string,
  setSubDistrict: (
    subDistricts: { id: string; dis_id: string; name: string }[]
  ) => void,
  subDistricts: { id: string; dis_id: string; name: string }[]
) => {
  const dis =
    subDistricts.filter((x: any) => x.dis_id === Number(dis_id)) || [];
  setSubDistrict(dis);
};

export const formatNumber = (
  value: number,
  style: string = "decimal",
  currency?: string
): string => {
  if (!value) return "-";
  const options: Intl.NumberFormatOptions =
    style === "currency"
      ? { style: "currency", currency: currency || "USD" }
      : style === "percent"
      ? { style: "percent" }
      : { style: "decimal" };

  return new Intl.NumberFormat("en-US", options).format(value);
};

export const formatCurrency = (amount: number) => {
  if (amount === 0) {
    return `-`;
  }

  if (amount >= 1_000_000_000_000_000) {
    return `${(amount / 1_000_000_000_000_000).toFixed(2)} พันล้านล้านบาท`;
  } else if (amount >= 1_000_000_000_000) {
    return `${(amount / 1_000_000_000_000).toFixed(2)} ล้านล้านบาท`;
  } else if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)} พันล้านบาท`;
  } else if (amount >= 10_000_000) {
    return `${(amount / 1_000_000).toFixed(2)} ล้านบาท`;
  } else if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)} ล้านบาท`;
  } else if (amount >= 100_000) {
    return `${(amount / 100_000).toFixed(1)} แสนบาท`;
  } else {
    return `${amount.toLocaleString()} บาท`;
  }
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

type DefaultFormatDate = "D MMMM BBBB" | "DD/MM/BBBB HH:mm" | (string & {});

export const ToDateThai = (
  txt: any,
  format: DefaultFormatDate = "D MMMM BBBB"
) => {
  try {
    dayjs.locale("th");

    return dayjs(txt, "DD/MM/YYYY HH:mm:ss").tz("Asia/Bangkok").format(format);
  } catch (error) {
    return "-";
  }
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

export const statusText = (status: number) => {
  const status_label_map = [
    "รอการประเมินราคา",
    "รอนักลงทุน",
    "รอนักลงทุน",
    "ขายฝากสำเร็จ",
  ];

  return status_label_map[status];
};

export const ResponseJson = (res: any, dataset?: any) => {
  return NextResponse.json(
    {
      status: res.status,
      code: res.code,
      data: dataset ?? res.data,
    },
    { status: res.code }
  );
};
