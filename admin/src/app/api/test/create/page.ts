import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = await axios.post("http://localhost:8078/v1/asset", {
      province_id: 1,
      district_id: 1,
      asset_type_id: 1,
      aria_size_rai: 0,
      aria_size_Ngan: 6,
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
      return NextResponse.json(error.response, {
        status: error.response?.status ?? 500,
      });
    }
  }
};