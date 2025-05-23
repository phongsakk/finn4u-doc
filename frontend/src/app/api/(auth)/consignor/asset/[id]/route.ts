import { catchError, formatDateThai, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { NextRequest, NextResponse } from "next/server";
dayjs.extend(customParseFormat);
dayjs.locale("th");

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;

    const session = await auth();
    const { data: response } = await axios.get(
      api.external(`/v1/consignor/asset/${id}`),
      {
        headers: {
          Authorization: "Bearer " + session?.user?.accessToken,
        },
      }
    );

    const data = response.data;

    const model = {
      id: data.id,
      aria_size: `${data?.aria_size_rai ? `${data.aria_size_rai} ไร่` : ""} ${
        data?.aria_size_ngan ? `${data.aria_size_ngan} งาน` : ""
      } ${
        data?.aria_size_square_wa ? `${data.aria_size_square_wa} ตารางวา` : ""
      } ${
        data?.aria_size_square_metre
          ? `${data.aria_size_square_metre} ตารางเมตร`
          : ""
      }`.trim(),
      location_x: Number(data.location_x),
      location_y: Number(data.location_y),
      province_name: data?.province?.name,
      status: data?.status,
      asset_type_name: data?.asset_type?.name,
      view_count: data?.view_count || 0,
      bid_count: data?.bid_count || 0,
      price_appraisal: data?.asset_appraisal?.price_appraisal || 0,
      collateral_price: data?.asset_appraisal?.collateral_price || 0,
      duration: data?.asset_appraisal?.duration || 0,
      asset_auction: data?.asset_auction && {
        from_date: `${dayjs(data.asset_auction.from_date).format(
          "DD/MM/YYYY"
        )} ${data.asset_auction.from_time}:00`,
        to_date: `${dayjs(data.asset_auction.to_date).format("DD/MM/YYYY")} ${
          data.asset_auction.to_time
        }:59`,
        max_tax: data.asset_auction.max_tax,
      },
    };

    return NextResponse.json(
      { status: response.status, code: response.code, data: model },
      { status: response.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
