import {
  catchError,
  CheckAuth,
  formatNumber,
  logError,
  ToDateThai,
} from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;

    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(
      api.external(`/v1/admin/matching?page=1`),
      {
        params: {
          page: page,
        },
        headers: session?.headerToken?.headers,
      }
    );

    const model = res?.data?.map((item: any) => ({
      id: item.asset.id,
      date_sell: ToDateThai(
        item?.asset?.asset_appraisal?.created_at,
        "DD/MM/BBBB"
      ),
      gen_id: item?.asset?.gen_id,
      consignor_name:
        item?.asset?.owner.Firstname + " " + item?.asset?.owner.Lastname,
      phone_number: item?.asset?.owner.PhoneNumber,
      province_name: item?.asset?.province.name,
      asset_type: item?.asset?.asset_type.name,
      collateral_price: formatNumber(
        item?.asset?.asset_appraisal.collateral_price
      ),
    }));
    // logError(123456, model);
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: model,
        page: res?.page,
        total: res?.total_page,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    logError(123456, body);
    const { data: res } = await axios.post(
      api.external(`/v1/admin/matching`),
      body,
      session.headerToken
    );

    return NextResponse.json(
      { status: res.status, code: res.code },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
