import {
  catchError,
  formatNumber,
  logError,
  ToDateThai,
} from "@components/helpers";
import { AssetModel } from "@models/AssetModel";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const { data: response } = await axios.get(
      api.external(`/v2/asset/recommended`),
      {
        params: {
          page: page,
          take: 3,
        },
      }
    );

    const model = response.data.map((item: any) => {
      var path = "rent";
      switch (item?.sell_type) {
        case "ขายฝาก":
          path = "property";
          break;
        case "ขาย":
          path = "sell";
          break;
        case "เช่า":
          path = "rent";
          break;
      }
      return {
        id: item.id,
        aria_size: `${item?.aria_size_rai ? `${item.aria_size_rai} ไร่` : ""} ${
          item?.aria_size_ngan ? `${item.aria_size_ngan} งาน` : ""
        } ${
          item?.aria_size_square_wa ? `${item.aria_size_square_wa} ตารางวา` : ""
        } ${
          item?.aria_size_square_metre
            ? `${item.aria_size_square_metre} ตารางเมตร`
            : ""
        }`.trim(),
        asset_image: "/",
        sell_type: item?.sell_type,
        image: item?.image || "",
        path: path,
        asset_type: item?.asset_type,
        province_name: item?.province_name,
        gen_id: item?.gen_id,
        price: formatNumber(Number(item?.price)),
        recommended_at: ToDateThai(dayjs(item?.recommended_at), "D MMMM BBBB"),
      };
    });

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
