import {
  catchError,
  CheckAuth,
  formatCurrency,
  formatNumber,
  ResponseJson,
  ToDateThai,
} from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    // const { data: res } = await axios.get(
    //   api.external(`/v1/investor/bid`),
    //   session.headerToken
    // );
    // return ResponseJson(res, res.data);
    const model = [
      {
        id: 2,
        aria_size: `1 ไร่ 2 งาน 3 ตารางวา 2 ตารางเมตร`,
        price_appraisal: formatNumber(5245000),
        collateral_price: formatCurrency(5145000),
        province_name: "กรุงเทพมหานคร",
        asset_type_name: "พื้นที่เปล่า",
        asset_image:
          "property//20250609164034-Screenshot 2025-06-09 145300.png",
        bid_date: ToDateThai(dayjs(), "D MMMM BBBB"),
      },
      {
        id: 3,
        aria_size: `2 ไร่ 2 งาน 3 ตารางวา 2 ตารางเมตร`,
        price_appraisal: formatNumber(46454522),
        collateral_price: formatCurrency(48856650),
        province_name: "กรุงเทพมหานคร",
        asset_type_name: "พื้นที่เปล่า",
        asset_image:
          "property//20250609164034-Screenshot 2025-06-09 14530.png",
        bid_date: ToDateThai(dayjs(), "D MMMM BBBB"),
      },
    ];

    return NextResponse.json(
      {
        status: true,
        code: 200,
        data: model,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
