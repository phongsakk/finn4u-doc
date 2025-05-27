import { catchError, CheckAuth, log, logError } from "@components/helpers";
import { api } from "@utils/api/index";
import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    
    const { data: res } = await axios.post(
      api.external("/v1/general/sell/publish"),
      body,
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
