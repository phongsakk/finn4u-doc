import {
  catchError,
  CheckAuth,
  formatNumber,
  ToDateThai,
} from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(
      api.external(``),
      session.headerToken
    );

    const model = [
      {
        id: 1,
        datetime: ToDateThai(dayjs()),
        fullname: "Serena Franklin",
        location: "กรุงเทพฯและปริมณฑล",
        asset_type: "คอนโด",
        investment_amount: formatNumber(1000000),
        verified: true,
      },
    ];

    return NextResponse.json(
      {
        status: true,
        code: 201,
        data: model,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
