import { catchError, CheckAuth, formatNumber } from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    // const { data: res } = await axios.get(
    //   api.external(`/v1/admin/overview`),
    //   session?.headerToken
    // );

    const most_viewers = [
      {
        location: "ดอนเมือง, ปทุมธานี",
        price: formatNumber(25065431),
        property_value: formatNumber(35065431),
      },
      {
        location: "บางละมุง, ชลบุรี",
        price: formatNumber(25065431),
        property_value: formatNumber(35065431),
      },
      {
        location: "ลาดกระบัง, กรุงเทพฯ",
        price: formatNumber(25065431),
        property_value: formatNumber(35065431),
      },
    ];

    const most_invester = [
      {
        fullname: "สมคิด จิตชื่นบาน",
        amount: formatNumber(350000),
      }, {
        fullname: "สมคิด จิตชื่นบาน",
        amount: formatNumber(350000),
      }, {
        fullname: "สมคิด จิตชื่นบาน",
        amount: formatNumber(350000),
      },
    ];

    return NextResponse.json(
      {
        status: true,
        // code: res.code,
        data: {
          consignment_total: formatNumber(30),
          stock_total: formatNumber(30),
          member: formatNumber(100),
          most_viewers: most_viewers,
          most_invester: most_invester,
          consignment_value: {
            label: ["1 เดือน", "7 วัน", "3 วัน", "เมื่อวาน", "วันนี้"],
            data: [20000, 200000, 2053000, 350000, 256400],
          },
          member_value: {
            label: ["1 เดือน", "7 วัน", "3 วัน", "เมื่อวาน", "วันนี้"],
            data: [50, 1523, 0, 53648, 6],
          },
        },
      },
      {
        // status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
