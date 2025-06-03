import {
  catchError,
  CheckAuth,
  formatNumber,
  log,
  logError,
  ToDateThai,
} from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(
      api.external(`/v1/admin/asset?page=${page}`),
      session?.headerToken
    );

    return NextResponse.json(
      {
        status: true,
        code: res.code,
        data: res?.data?.map((item: any) => ({
          id: item.id,
          created_at: ToDateThai(dayjs(item?.created_at), "DD/MM/BBBB HH:mm"),
          province_name: item?.province?.name,
          asset_type: item?.asset_type?.name,
          price_appraisal: formatNumber(item?.asset_appraisal?.price_appraisal),
          duration: formatNumber(item?.asset_appraisal?.duration) + " ปี",
          status: item?.status,
          recommended_at: item?.recommended_at ? true : false,
        })),
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
