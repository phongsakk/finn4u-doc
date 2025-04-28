import { catchError, log, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { data: res_otp } = await axios.post(
      api.external(`/v1/auth/consignor/verifyOTP`),
      body
    );
    if (res_otp.status) {
      return NextResponse.json(
        {
          status: true,
          message: res_otp.message,
          data: {
            email: body.email,
            accessToken: res_otp.data.access_token,
            refreshToken: res_otp.data.refresh_token,
          },
        },
        { status: res_otp.code }
      );
    }

    return NextResponse.json(
      {
        status: false,
        message: res_otp.message,
      },
      { status: res_otp.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
