import { auth } from "@libs/auth";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export const log = (text: string) => {
  console.log(
    `\x1b[32m${dayjs().format("DD-MM-YYYY HH:mm:ss")}\x1b[0m -> ${text}`
  );
};

