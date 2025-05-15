import {
  catchError,
  CheckAuth,
  formatNumber,
  ToDateThai,
} from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(api.external(``), {
      params: {
        page: page,
      },
      headers: session?.headerToken?.headers,
    });

    const model = [
      {
        id: 1,
        datetime: ToDateThai(dayjs(), "DD/MM/BBBB HH:mm:ss"),
        fullname: "Serena Franklin",
        phone_number: "0951234531",
        career: "ผู้ที่ประกอบธุรกิจส่วนตัว",
        salary: formatNumber(1000000),
        email: "somkid_J@gmail.com",
        province_name: "กรุงเทพมหานคร",
      },
    ];

    return NextResponse.json(
      {
        status: true,
        code: 201,
        data: model,
        page: 1,
        total: 1,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
