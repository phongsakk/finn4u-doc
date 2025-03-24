import { logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { AssetModel } from "@models/AssetModel";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;

    const session = await auth();
    const { data: response } = await axios.get(
      api.external(`/v1/general/asset/${id}`),
      {
        headers: {
          Authorization: "Bearer " + session?.user?.accessToken,
        },
      }
    );
    logError("test:", response);

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
      collateral: Number(data.collateral),
      consignment_price: Number(data.consignment_price),
      location_x: Number(data.location_x),
      location_y: Number(data.location_y),
      province_name: data?.province?.name,
      asset_type_name: data?.asset_type?.name,
      images: data?.asset_images.map((item: any) => ({
        image: item.image,
      })),
      asset_auction: data?.asset_auction && {
        from_date: data.asset_auction.from_date,
        from_time: data.asset_auction.from_time,
        to_date: data.asset_auction.to_date,
        to_time: data.asset_auctionto_time,
      },
    };

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
