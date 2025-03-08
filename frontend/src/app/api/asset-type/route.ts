import { NextResponse } from "next/server";
import { log } from "@components/helpers";
import { AccessAuth } from "@components/auth";
import axios, { AxiosError } from "axios";
import { api } from "@utils/api/index";
export const GET = async () => {
  try {
    const { data: asset_type } = await axios.get(api.external("/v1/master/asset-type"));

    return NextResponse.json({ data: asset_type.data, status: asset_type.status });

  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return NextResponse.json(error.response, {
        status: error.response?.status,
      });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        {
          status: 500,
        }
      );
    }
  }
};
