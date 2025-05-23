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
    const { data: res } = await axios.get(
      api.external(`/v1/general/sell/${id}`),
      session?.headerToken
    );
    const data = res.data;
    const model = {
      id: data.id,
      title: data?.title,
      price: formatNumber(data?.price),
      google_map_location: data?.google_map_location,
      location:
        data?.district?.name &&
        `${data?.district?.name}, ` + data?.province?.name,
      square_meter: data?.square_meter,
      unit:
        data?.bedroom_count &&
        `${data.bedroom_count} ห้องนอน, ` + data?.bathroom_count &&
        `${data.bathroom_count} ห้องน้ำ, ` + data?.floor_level &&
        `${data.floor_level} ชั้น`,
      created_at: ToDateThai(dayjs(data?.created_at), "D MMMM BBBB"),
      project_name: data?.project_name,
      asset_type_name: data?.asset_type?.name,
      description:
        data?.description ||
        "ข้อมูลเพิ่มเติม\r\n" +
          "-- บ้านเดี่ยว 2 ชั้น จอดรถในบ้านได้ 2 คัน พื้นที่รอบตัวบ้าน\r\n" +
          "-- เนื้อที่ 39 ตารางวา พื้นที่ใช้สอย 140 ตารางเมตร\r\n" +
          "-- 3 ห้องนอน 3 ห้องน้ำ 1 ห้องโถง 1 ห้องครัว พร้อมสวนสวยหน้าบ้าน\r\n" +
          "สิ่งอำนวยความสะดวกในบ้าน\r\n" +
          "-- เครื่องปรับอากาศ\r\n" +
          "-- เฟอร์นิเจอร์ให้บางส่วน\r\n" +
          "-- เคาท์เตอร์ครัวบิ้วท์อิน\r\n" +
          "-- ห้องน้ำสุขภัณฑ์ครบ\r\n" +
          "สิ่งอำนวยความสะดวกในโครงการ\r\n" +
          "-- คลับเฮ้าส์หรู พร้อมห้องรับรอง\r\n" +
          "-- สระว่ายน้ำ ระบบเกลือ\r\n" +
          "-- ห้องฟิตเนส\r\n" +
          "-- ส่วนธรรมชาติร่มรื่น\r\n" +
          "สถานที่ใกล้เคียง\r\n" +
          "-- รถไฟฟ้าสีม่วง คลองบางไผ่\r\n" +
          "-- เซ็นทรัล เวสต์เกต\r\n" +
          "-- ตลาดกลางบางใหญ่\r\n" +
          "-- ไปรษณีย์บางใหญ่\r\n" +
          "-- โรงพยาบาลบางใหญ่\r\n" +
          "----- ราคาขาย : 5.19 ล้านบาท (ค่าโอนคนละครึ่ง) -----\r\n" +
          "@@ สนใจนัดดูบ้าน โปรดโทรนัดหมายล่วงหน้า",
      owner: data?.owner && {
        fullname: data.owner?.Firstname + " " + data.owner?.Lastname,
        phone_number: data.owner?.PhoneNumber,
        line: data.owner?.PhoneNumber,
        email: data.owner?.email,
      },
      images: data?.images?.map((item: any) => ({
        image: item.image,
      })),
    };
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: model,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
