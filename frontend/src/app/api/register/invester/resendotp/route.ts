import { catchError, log, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data: res_otp } = await axios.post(
      api.external(`/v1/auth/investor/resendOTP`),
      body
    );
    return NextResponse.json(
      {
        status: true,
        message: res_otp.message,
        data: {
          ref: res_otp.data.ref,
        },
      },
      { status: res_otp.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
