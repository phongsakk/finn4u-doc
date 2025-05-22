import { catchError, CheckAuth } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const asset_type =
      Number(req.nextUrl.searchParams.get("asset_type")) || null;

    const session = await CheckAuth();

    const { data: res } = await axios.get(
      api.external(
        `/v1/general/sell?limit=10&page=${page}&order_by=created_at&sort=desc`
      ),
      session?.headerToken
    );

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res.data,
        page: res.page,
        total: res.total_page,
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
