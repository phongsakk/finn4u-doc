import { log } from "@components/helpers";
import { api } from "@utils/api/index";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await axios.post(api.external("/v1/asset"), body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: error.response?.data || "An error occurred",
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json("unknow error");
    }
  }
};

export const GET = async () => {
  try {
    const { data: response } = await axios.get(api.external("/v1/asset"));
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: error.response?.data || "An error occurred",
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json("unknow error");
    }
  }
};
