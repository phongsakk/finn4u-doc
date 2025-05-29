import { catchError, CheckAuth, logError } from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const { id } = await params;
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.post(
      api.external(`/v1/admin/sell/${id}/set-as-recommended`),{},
      session.headerToken
    );
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        data: res.data,
      },
      { status: res.code }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
