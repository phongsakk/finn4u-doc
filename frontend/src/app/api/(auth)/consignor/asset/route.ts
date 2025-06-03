import { catchError, CheckAuth, log, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { AssetModel } from "@models/AssetModel";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();

    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: response } = await axios.get(
      api.external("/v1/consignor/asset"),
      session.headerToken
    );
    const model = response.data.map(
      (item: any) =>
        ({
          id: item.id,
          aria_size: `${
            item?.aria_size_rai ? `${item.aria_size_rai} ไร่` : ""
          } ${item?.aria_size_ngan ? `${item.aria_size_ngan} งาน` : ""} ${
            item?.aria_size_square_wa
              ? `${item.aria_size_square_wa} ตารางวา`
              : ""
          } ${
            item?.aria_size_square_metre
              ? `${item.aria_size_square_metre} ตารางเมตร`
              : ""
          }`.trim(),
          price_appraisal: item?.asset_appraisal?.price_appraisal || null,
          collateral_price: item?.asset_appraisal?.collateral_price || null,
          date_sell: item?.asset_appraisal?.created_at || null,
          location_x: item.location_x,
          location_y: item.location_y,
          province_name: item?.province?.name,
          asset_type_name: item?.asset_type?.name,
          view_count: item?.view_count || 0,
          bid_count: item?.bid_count || 0,
          asset_image: item?.asset_images[0]?.image,
          asset_auction: item?.asset_auction && {
            from_date: item.asset_auction.from_date,
            from_time: item.asset_auction.from_time,
            to_date: item.asset_auction.to_date,
            to_time: item.asset_auctionto_time,
          },
        } as AssetModel)
    );

    return NextResponse.json(
      {
        status: response.status,
        code: response.code,
        data: model,
        page: {
          page: response.page,
          total: response.total_page,
        },
      },
      { status: response.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
