import {
  catchError,
  CheckAuth,
  formatNumber,
  prefix,
  ToDateThai,
} from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(api.external(`/v1/admin/investor`), {
      params: {
        page: page,
      },
      headers: session.headerToken?.headers,
    });

    const model = res.data.map((item: any) => ({
      id: item.id,
      datetime: ToDateThai(item.created_at, "DD/MM/BBBB HH:mm:ss"),
      fullname: `${prefix(item.UserPrefixID)}${item.Firstname} ${
        item.Lastname
      }`,
      location: "กรุงเทพฯและปริมณฑล",
      asset_type: item?.asset_type?.name,
      investment_amount: formatNumber(item.investment_amount),
      verified: item.verified,
    }));

    return NextResponse.json(
      {
        status: true,
        code: 201,
        data: model,
        page: res.page,
        total: res.total_page,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
