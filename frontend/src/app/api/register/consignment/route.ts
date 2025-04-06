import { catchError, log, logError } from "@components/helpers";
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
    return NextResponse.json(
      { status: true, data: res_regis.data },
      { status: res_regis.code }
    );
  } catch (error) {
    return NextResponse.json(catchError(error));
  }
};

export const GET = () => {
  return NextResponse.json(12345);
};
