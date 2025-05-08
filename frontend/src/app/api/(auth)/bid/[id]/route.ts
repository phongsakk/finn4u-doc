import { catchError, logError } from "@components/helpers";
import { auth } from "@libs/auth";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "No id" }, { status: 401 });
    }
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const model = {
      asset_id: Number(id),
      offer: body.offer,
    };

    const { data: res_bid } = await axios.post(
      api.external(`/v1/consignor/bid`),
      model,
      {
        headers: {
          Authorization: "Bearer " + session.user?.accessToken,
        },
      }
    );

    return NextResponse.json(
      {
        code: res_bid.code,
        status: res_bid.status,
        data: {
          message: res_bid.message,
        },
      },
      { status: res_bid.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
