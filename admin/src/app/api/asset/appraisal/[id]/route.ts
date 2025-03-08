import { log, logError } from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const body = await req.json();
    const formData = await body.formData;
    if (!params) {
      return NextResponse.json({ error: "No id" }, { status: 401 });
    }
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = session.user?.accessToken ?? "";
    const response = await axios.post(
      api.external(`/v1/admin/asset/${id}/appraisal`),
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const model = {
      ...response.data,
    };

    return NextResponse.json(model, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error?.response?.data);

      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: [],
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
