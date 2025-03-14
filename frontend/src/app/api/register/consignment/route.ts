import { logError } from "@components/helpers";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    return NextResponse.json({ data: "success" }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      logError(error.response?.data);
      return NextResponse.json(
        { data: "register error" },
        {
          status: error.response?.status,
        }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        {
          status: 500,
        }
      );
    }
  }
};
