import { catchError, CheckAuth, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const sell_type_id = Number(req.nextUrl.searchParams.get("sell_type")) || 1;
    const asset_type =
      Number(req.nextUrl.searchParams.get("asset_type")) || null;

    const session = await CheckAuth();

    const { data: res } = await axios.get(
      api.external(
        `v1/general/sell?limit=20&page=${page}&order_by=created_at&sort=desc&sell_type_id=${sell_type_id}`
      ),
      session?.headerToken
    );

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res?.data?.map((item: any) => ({
          id: item.id,
          title: item?.title,
          image: item?.images[0]?.image,
          square_meter: item?.square_meter,
          district_name: item?.district?.name,
          province_name: item?.province?.name,
          created_at: item.created_at,
          price: item?.price,
        })),
        page: {
          page: res.page,
          total: res.total_page,
        },
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
