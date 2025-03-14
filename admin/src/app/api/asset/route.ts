import { log, logError } from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const token = session.user?.accessToken ?? "";
    const response = await axios.get(api.external("/v1/admin/asset"), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data:[],
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { error: "unknow error", data: [] },
        { status: 500 }
      );
    }
  }
};
