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
    if (!session.status) {
      return NextResponse.json(session);
    }
    const { data: res } = await axios.get(
      api.external(
        `/v1/general/sell/my?limit=12&page=${page}&order_by=created_at&sort=desc`
      ),
      session.headerToken
    );

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res.data,
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
