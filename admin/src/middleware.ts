import { CheckAuth } from "@component/dev/Helpers";
import { auth } from "@setting/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const pathname = req.url;
  const authPaths = ["/auth/"];
  const systems = ["node_modules", "/session", "/image", ".ico", ".js", ".css", "/test"];
  const apiPaths = ["/api/"];

  const pathGroup = [...authPaths, ...systems, ...apiPaths]
  if (pathGroup.some((path) => pathname.includes(path))) {
    return NextResponse.next();
  }

  const session =  await CheckAuth();

  if (!session.status || session.role != "admin") {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
