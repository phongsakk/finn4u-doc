import { catchError, CheckAuth } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    const { data: res_sell_type } = await axios.get(
      api.external(`/v1/master/sell-type`),
      session.headerToken
    );
    const { data: res_asset_type } = await axios.get(
      api.external(`/v1/master/asset-type`),
      session.headerToken
    );

    const { data: res_province } = await axios.get(
      api.external("/v1/master/province"),
      session.headerToken
    );
    const { data: res_district } = await axios.get(
      api.external("/v1/master/district"),
      session.headerToken
    );
    const { data: res_subdistrict } = await axios.get(
      api.external("/v1/master/sub-district"),
      session.headerToken
    );

    const model = {
      status: true,
      code: 201,
      data: {
        sell_type:
          res_sell_type?.data?.map((item: any) => ({
            id: item.id,
            name: item.name,
          })) || [],
        asset_type:
          res_asset_type?.data?.map((item: any) => ({
            id: item.id,
            name: item.name,
          })) || [],
        province:
          res_province?.data?.map((item: any) => ({
            id: item.id,
            name: item.name,
          })) || [],
        district:
          res_district?.data?.map((item: any) => ({
            id: item.id,
            name: item.name,
            pro_id: item.province_id,
          })) || [],
        subDistrict:
          res_subdistrict?.data?.map((item: any) => ({
            id: item.id,
            name: item.name,
            postal_code: item.zip_code,
            dis_id: item.district_id,
          })) || [],
      },
    };

    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
