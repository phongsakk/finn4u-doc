import { UploadFiles } from "@components/dev/uploadfile";
import {
  catchError,
  CheckAuth,
  formatNumber,
  logError,
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
        id: item.id,
        image: item.image,
        is_check: true,
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

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    const formData = await req.formData();
    const jsonModel = JSON.parse(
      JSON.stringify(Object.fromEntries(formData.entries()))
    );

    const images = await UploadFiles(
      formData.getAll("images[]") as File[],
      "property"
    );

    const old_images = JSON.parse(jsonModel.old_images);

    const model = {
      sell_type_id: Number(jsonModel?.sell_type_id),
      asset_type_id: Number(jsonModel?.asset_type_id),
      title: jsonModel?.title,
      project_name: jsonModel?.project_name,
      address: jsonModel?.address,
      street: jsonModel?.street,
      soi: jsonModel?.soi,
      province_id: Number(jsonModel?.province_id),
      district_id: Number(jsonModel?.district_id),
      sub_district_id: Number(jsonModel?.sub_district_id),
      postal_code: jsonModel?.postal_code,
      google_map_location: jsonModel?.google_map_location,
      bedroom_count: Number(jsonModel?.bedroom_count),
      bathroom_count: Number(jsonModel?.bathroom_count),
      floor_level: Number(jsonModel?.floor_level),
      square_meter: Number(jsonModel?.square_meter),
      price: Number(jsonModel?.price),
      description: jsonModel?.description,
      agency_required: jsonModel?.agency_required == "true" ? true : false,
      locataion_x: Number(jsonModel?.locataion_x),
      locataion_y: Number(jsonModel?.locataion_y),
      images: {
        add: images || [],
        remove:
          old_images
            ?.filter((x: any) => x?.is_check === false)
            ?.map((x: any) => x.id) || [],
      },
    };

    const { data: res } = await axios.post(
      api.external(`/v1/general/sell/${id}`),
      model,
      session.headerToken
    );

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: {
          id: res?.data?.id || null,
        },
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
