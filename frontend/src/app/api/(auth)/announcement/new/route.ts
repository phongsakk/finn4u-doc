import { catchError, CheckAuth, log, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { UploadFiles } from "@components/dev/uploadfile";

export const POST = async (req: Request) => {
  try {
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
      locataion_x: Number(jsonModel?.locataion_x),
      locataion_y: Number(jsonModel?.locataion_y),
      images: images,
    };

    logError(121321,model)
    const { data: res } = await axios.post(
      api.external("/v1/general/sell"),
      model,
      session.headerToken
    );

    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res.data,
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
