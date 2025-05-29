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
    const { data: res } = await axios.get(
      api.external(`/v1/general/sell/${id}`),
      session?.headerToken
    );
    const data = res.data;
    const model = {
      id: data.id,
      title: data?.title,
      price: formatNumber(data?.price),
      google_map_location: data?.google_map_location,
      location:  data?.district?.name && `${ data?.district?.name}, `+ data?.province?.name,
      square_meter: data?.square_meter,
      unit:
        data?.bedroom_count &&
        `${data.bedroom_count} ห้องนอน, ` + data?.bathroom_count &&
        `${data.bathroom_count} ห้องน้ำ, ` + data?.floor_level &&
        `${data.floor_level} ชั้น`,
      created_at: ToDateThai(dayjs(data?.created_at), "D MMMM BBBB"),
      project_name: data?.project_name,
      asset_type_name:data?.asset_type?.name,
      description: data?.description,
      owner: data?.owner && {
        fullname: data.owner?.Firstname + " " + data.owner?.Lastname,
        phone_number: data.owner?.PhoneNumber,
        line: data.owner?.PhoneNumber,
        email: data.owner?.email,
      },
      images: data?.images?.map((item: any) => ({
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
