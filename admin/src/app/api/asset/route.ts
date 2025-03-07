import { auth } from "@setting/auth";
import { api } from "@utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (r: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const token = session.user?.accessToken ?? "";
  const response = await axios.get(api.external("/v1/"))

  return NextResponse.json(response.data, {
    status: 200,
  });
};
