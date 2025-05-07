import { log, logError } from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const token = session.user?.accessToken ?? "";
    const { data: res_tags } = await axios.get(api.external("/v1/admin/tag"), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(
      {
        status: true,
        data:
          res_tags.data.map(({ id, name }: { id: number; name: string }) => ({
            id,
            name,
          })) || [],
      },
      {
        status: res_tags.code,
      }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status || 500,
          data: [],
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ status: false, data: [] }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const body = await req.json();
    const token = session.user?.accessToken ?? "";

    const { data: res_tag } = await axios.post(
      api.external("/v1/admin/tag"),
      {
        name: body.new_tag,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return NextResponse.json(
      { status: true, message: "Tag created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: false }, { status: 500 });
  }
};
