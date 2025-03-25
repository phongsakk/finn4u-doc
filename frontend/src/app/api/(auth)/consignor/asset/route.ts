import { log, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    const { data: response } = await axios.get(
      api.external("/v1/consignor/asset"),
      {
        headers: {
          Authorization: "Bearer " + session?.user?.accessToken,
        },
      }
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
        })
    );

    return NextResponse.json({ status: true, data: model }, { status: 200 });
  } catch (error) {
    logError("test", error);

    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: error.response?.data || "An error occurred",
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json("unknow error");
    }
  }
};
