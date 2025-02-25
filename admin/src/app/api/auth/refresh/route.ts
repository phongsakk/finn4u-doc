import { apiRefreshTokenResponseSchema } from "@libs/validate/auth";
import { auth } from "@setting/auth";
import { apiRefreshToken } from "@utils/api/external";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "Guest";
  const message = searchParams.get("message") || "No message provided";

  return NextResponse.json({ error: `${name} : ${message}` }, { status: 500 });
};

export const POST = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {

    const response = await apiRefreshToken({
      refresh_token: session.user.refreshToken,
    });

    const refreshed = await apiRefreshTokenResponseSchema.parseAsync(
      response.data
    );
    return NextResponse.json(refreshed, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return NextResponse.json(error.response, {
        status: error.response?.status,
      });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, {
        status: 500,
      });
    }
  }
};
