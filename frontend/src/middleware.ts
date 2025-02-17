import { NextResponse } from "next/server";

export const middleware = (req: Request) => {
  return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
  matcher: ["/test/:path*"],
};
