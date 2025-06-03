import {
  catchError,
  CheckAuth,
  formatNumber,
  ToDateThai,
} from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    const { data: res } = await axios.get(
      api.external(`/v1/general/sell/${id}`),
      session?.headerToken
    );
    const data = res.data;
    const model = {
      sell_type_id: data?.sell_type_id,
      asset_type_id: data?.asset_type_id,
      title: data?.title,
      project_name: data?.project_name,
      address: data?.address,
      street: data?.street,
      soi: data?.soi,
      province_id: String(data?.province_id),
      district_id: String(data?.district_id),
      sub_district_id: String(data?.sub_district_id),
      postal_code: data?.postal_code,
      google_map_location: data?.google_map_location,
      bedroom_count: data?.bedroom_count,
      bathroom_count: data?.bathroom_count,
      floor_level: data?.floor_level,
      square_meter: data?.square_meter,
      price: data?.price,
      description: data?.description,
      agency_required: data?.agency_required,
      old_images: data?.images?.map((item: any) => ({
        image: item.image,
      })),
    };

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: model,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
