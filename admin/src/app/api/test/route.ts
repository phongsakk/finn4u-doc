import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await axios.get("http://localhost:8078/v1/asset");
  return NextResponse.json(response.data, { status: response.status });
};

export const POST = async () => {
  try {
    const response = await axios.post("http://localhost:8078/v1/asset", {
      province_id: 1,
      district_id: 1006,
      asset_type_id: 1,
      aria_size_rai: 0,
      aria_size_ngan: 6,
      aria_size_square_wa: 50,
      collateral: 1,
      consignment_price: 100,
      land_title_deed_number: "112",
      land_plot_number: "224",
      ended_at: "2025-03-01T00:00:00Z",
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.status });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
