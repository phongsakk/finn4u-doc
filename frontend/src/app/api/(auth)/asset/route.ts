import { catchError, log, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { AssetModel } from "@models/AssetModel";
import { UploadFile, UploadFiles } from "@components/dev/uploadfile";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const formData = await req.formData();
    const jsonModel = JSON.parse(
      JSON.stringify(Object.fromEntries(formData.entries()))
    );
    const land_title_deed_image = await UploadFile(
      formData.get("land_title_deed_image") as File,
      "property"
    );
    const asset_images = await UploadFiles(
      formData.getAll("asset_images[]") as File[],
      "property"
    );

    const model = {
      // ...jsonModel,
      province_id: Number(jsonModel.province_id),
      district_id: Number(jsonModel.district_id),
      asset_type_id: Number(jsonModel.asset_type_id),
      aria_size_rai: Number(jsonModel.aria_size_rai),
      aria_size_Ngan: Number(jsonModel.aria_size_Ngan),
      aria_size_square_wa: Number(jsonModel.aria_size_square_wa),
      aria_size_meter: Number(jsonModel.aria_size_meter),
      land_title_deed_number: jsonModel.land_title_deed_number,
      land_plot_number: jsonModel.land_plot_number,
      land_title_deed_image: land_title_deed_image,
      asset_images: asset_images,
      locataion_x: Number(jsonModel.locataion_x),
      locataion_y: Number(jsonModel.locataion_y),
      is_multiple_holder: jsonModel.is_multiple_holder == "true" ? true : false,
      description: jsonModel.description,
    };
    const { data: res } = await axios.post(
      api.external("/v1/consignor/asset"),
      model,
      {
        headers: {
          Authorization: "Bearer " + session?.user?.accessToken,
        },
      }
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
