import { catchError, CheckAuth } from "@component/dev/Helpers";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }

    // const {data:res}  = await axios.get(api.external(``));

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await CheckAuth();
    if (!session.status) {
      return NextResponse.json(session);
    }
    // const {data:res} = await axios.post(api.external(``))
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json(await catchError(error));
  }
};
