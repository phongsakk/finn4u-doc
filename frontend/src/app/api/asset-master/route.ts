import { catchError, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const {
      data: { data: provinces },
    } = await axios.get(api.external("/v1/master/province"));

    const {
      data: { data: asset_types },
    } = await axios.get(api.external("/v1/master/asset-type"));
    return NextResponse.json(
      {
        status: true,
        code: provinces.code,
        data: {
          province: provinces,
          asset_type: asset_types,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
