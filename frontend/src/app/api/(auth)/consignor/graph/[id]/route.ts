import { catchError, CheckAuth, PercentageCal } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    // const { data: res } = await axios.get(
    //   api.external(`/v2`),
    //   session.headerToken
    // );

    return NextResponse.json(
      {
        status: true,
        code: 200,
        data: {
          price_appraisal: 5270030,
          percent_rate: 9,
          duration: 1,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
