import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import logger from "./lib/logger";

export async function proxy(request: NextRequest) {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   logger.info("User not logged in, redirecting to login");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/u/:path*"], // Specify the routes the middleware applies to
};
