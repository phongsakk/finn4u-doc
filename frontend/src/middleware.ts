import { auth } from "@libs/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const session = await auth();
  if (!session) {
    const originalUrl = req.url;

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
  ],
};
