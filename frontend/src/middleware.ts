import { auth } from "@libs/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session) {
    const originalUrl = `${req.nextUrl.pathname}`;

    const url = new URL("/", req.url);
    url.searchParams.set("modal", "login");
    url.searchParams.set("redirect", originalUrl);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/consignment/:path*",
    "/investment/:path*",
    "/property/contract/:path*",
    "/profile/:path*",
  ],
};
