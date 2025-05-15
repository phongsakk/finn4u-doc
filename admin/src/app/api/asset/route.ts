import { catchError, CheckAuth, log, logError } from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(api.external("/v1/admin/asset"), {
      params: {
        page: page,
      },
      headers: session?.headerToken?.headers,
    });

    return NextResponse.json(
      {
        status: true,
        code: res.code,
        data: res.data,
        page: res.page,
        total: res.total_page,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
