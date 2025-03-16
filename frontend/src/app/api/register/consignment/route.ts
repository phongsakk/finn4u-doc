import { log, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data: res_regis } = await axios.post(
      api.external("/v1/auth/signup"),
      body
    );
    log("signup:", res_regis);
    return NextResponse.json({ data: "success" }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      logError("error: ", error.response?.data);
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

export const GET = () => {
  return NextResponse.json(12345);
};
