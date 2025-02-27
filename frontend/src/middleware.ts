import { auth } from "@lib/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const session = await auth();
  if (!session) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ["/consignment/:path*","/investment/:path*"],
};
