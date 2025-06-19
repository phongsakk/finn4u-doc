import { catchError, CheckAuth, formatNumber } from "@component/dev/Helpers";
import { api } from "@utils/api";
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
    const { data: res } = await axios.get(api.external(``));
    return NextResponse.json(
      {
        status: true,
        code: 200,
        data: {
          appraisal_price: formatNumber(5270030),
          land_transfer: formatNumber(5),
          duty: formatNumber(5),
          witness: formatNumber(20),
          land_transfer_tax: formatNumber(2),
          stamp: formatNumber(0.5),
          specific_business_tax: formatNumber(3.3),
          interest_rate: formatNumber(9),
          total: "",
          price_received: "",

          percent: 9,
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
