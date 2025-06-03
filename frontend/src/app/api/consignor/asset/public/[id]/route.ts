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
      api.external(`/v1/consignor/asset/public/${id}`),
      {
        headers: {
          Authorization: "Bearer " + session?.user?.accessToken,
        },
      }
    );

    const data = response.data;
    var model_auction = null;

    if (data?.asset_auction) {
      const fromDatetime = dayjs(
        `${dayjs(data.asset_auction.from_date).format("YYYY-MM-DD")}T${
          data.asset_auction.from_time
        }:00`
      );
      const toDatetime = dayjs(
        `${dayjs(data.asset_auction.to_date).format("YYYY-MM-DD")}T${
          data.asset_auction.to_time
        }:59`
      );

      model_auction = {
        from_date: fromDatetime.toISOString(),
        to_date: toDatetime.toISOString(),
        max_tax: data.asset_auction.max_tax,
      };
    }

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
      asset_type_name: data?.asset_type?.name,
      view_count: data?.view_count || 0,
      bid_count: data?.bid_count || 0,
      asset_appraisal: {
        price_appraisal: data?.asset_appraisal?.price_appraisal || null,
        collateral_price: data?.asset_appraisal?.collateral_price || null,
        duration: data?.asset_appraisal?.duration || null,
      },
      asset_tag:
        data?.asset_tag?.map((item: any, index: number) => ({
          id: item.id,
          name: item.tag.name,
        })) || [],
      images:
        data?.asset_images
          ?.filter((x: any) => x.is_display == true)
          .map((item: any) => ({
            image: item.image,
          })) || [],
      asset_auction: model_auction,
    };

    return NextResponse.json(
      { status: response.status, code: response.code, data: model },
      { status: response.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
