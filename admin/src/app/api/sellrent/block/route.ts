import { catchError, CheckAuth, logError } from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    const { data: res } = await axios.post(
      api.external(`/v1/admin/sell/block`),
      body,
      session.headerToken
    );
    
    return NextResponse.json(
      {
        status: res.status,
        code: res.code,
        message: res?.message,
      },
      {
        status: res.code,
      }
    );
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
