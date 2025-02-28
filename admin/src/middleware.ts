import { auth } from "@setting/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const pathname = req.url;
  const authPaths = ["/auth/"];
  const systems = ["node_modules", "/session", ".ico", ".js", ".css"];
  const apiPaths = ["/api/"];

  const pathGroup = [...authPaths, ...systems, ...apiPaths]
  if (pathGroup.some((path) => pathname.includes(path))) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
