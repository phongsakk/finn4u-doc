import { catchError, log } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    // const { data: res_otp } = await axios.post(
    //   api.external(`/v1/register/resendotp/${id}`),body
    // );

    return NextResponse.json(
      { status: true, message: "resend otp successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(catchError(error));
  }
};
