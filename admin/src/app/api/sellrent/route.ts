import { catchError, CheckAuth, ToDateThai } from "@component/dev/Helpers";
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
    const { data: res } = await axios.get(
      api.external(
        `/v1/admin/sell?limit=20&page=${page}&order_by=created_at&sort=desc`
      ),
      session?.headerToken
    );
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res?.data?.map((item: any) => ({
          id: item.id,
          created_at: ToDateThai(dayjs(item?.created_at), "DD/MM/BBBB HH:mm"),
          fullname: item?.owner?.Firstname + " " + item?.owner?.Lastname,
          title: item?.title,
          agency_required: item?.agency_required,
          sell_type: item?.sell_type?.name,
          view_front: `https://finn4u.com/${
            item?.sell_type?.id == 1 ? "rent" : "sell"
          }/detail/${item.id}`,
          asset_type: item?.asset_type?.name,
          is_disabled: item?.is_disabled,
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
