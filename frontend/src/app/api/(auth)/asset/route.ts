import { catchError, log, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { AssetModel } from "@models/AssetModel";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const body = await req.json();
    const { data: res } = await axios.post(api.external("/v1/asset"), body, {
      headers: {
        Authorization: "Bearer " + session?.user?.accessToken,
      },
    });

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res.data,
      },
      { status: res.status }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

export const GET = async () => {
  try {
    const session = await auth();
    const { data: response } = await axios.get(api.external("/v1/asset"), {
      headers: {
        Authorization: "Bearer " + session?.user?.accessToken,
      },
    });

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
          collateral: item.collateral,
          consignment_price: item.consignment_price,
          location_x: item.location_x,
          location_y: item.location_y,
          province_name: item?.province?.name,
          asset_type_name: item?.asset_type?.name,
          asset_auction: item?.asset_auction && {
            from_date: item.asset_auction.from_date,
            from_time: item.asset_auction.from_time,
            to_date: item.asset_auction.to_date,
            to_time: item.asset_auctionto_time,
          },
        } as AssetModel)
    );

    return NextResponse.json({ status: true, data: model }, { status: 200 });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
