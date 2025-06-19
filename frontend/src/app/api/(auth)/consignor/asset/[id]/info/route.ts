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
    if (!session.status) {
      return NextResponse.json(session);
    }
    // const {data:res} =await axios.get(api.external(``),session.headerToken)

    const model = {
      firstname: "สมนึก",
      lastname: "คิดนาน",
      asset_id: "00007",
      asset_type_name: "ที่ดินพร้อมสิ่งปลูกสร้าง",
      address: "23/3",
      district_name: "ลาดกระบัง",
      sub_district_name: "ขุมทอง",
      zipcode: "10520",
      province_name: "กรุงเทพฯ",
      aria_size: "20",
      price_appraisal: formatNumber(5275000),
      collateral_price: formatNumber(754300),
      date_sell: ToDateThai(dayjs(), "D MMMM BBBB"),
      status: 0,
      duration: formatNumber(1),
      end_sell: ToDateThai(dayjs(), "D MMMM BBBB"),
    };

    return NextResponse.json(
      { status: true, code: 200, data: model },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
