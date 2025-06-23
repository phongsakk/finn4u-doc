import { UploadFile } from "@components/dev/uploadfile";
import {
  catchError,
  CheckAuth,
  logError,
  ResponseJson,
} from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.get(
      api.external(`/v2/auth/my`),
      session.headerToken
    );
    return ResponseJson(res, {
      id: res?.data?.id || 0,
      role: session.role,
      image:"profile/20250610171105-profile.png",
      user_prefix_id: String(res?.data?.UserPrefixID || 1),
      firstname: res?.data?.firstname || "",
      lastname: res?.data?.lastname || "",
      email: res?.data?.email,
      phone_number: res?.data?.phone_number || "",
      line: res?.data?.Line || "",
      birthday: res?.data?.birthday || "",
      license_card: res?.data?.LicenseCard || "",
    });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    const formData = await req.formData();
    const formJson = Object.fromEntries(formData.entries());
    const body = JSON.parse(String(formJson?.body));

    const image = await UploadFile(
      formData.get("new_image") as File,
      "profile"
    );

    const model = {
      ...body,
      new_image: image,
    };

    logError("==>", model);
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
