import dayjs from "dayjs";

export const log = (text: string) => {
  console.log(
    `\x1b[32m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`
  );
};

export const logError = (text: string) => {
    console.log(
      `\x1b[31m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`
    );
  };
  