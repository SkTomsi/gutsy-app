import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const host = request.headers.get("host") || "";

  // Remove port (localhost:3000)
  const hostname = host.split(":")[0];

  // Extract subdomain
  const parts = hostname.split(".");
  const subdomain = parts.length > 2 ? parts[0] : null;

  const url = request.nextUrl;

  // 👨‍⚕️ Food coaches
  if (subdomain === "experts") {
    url.pathname = `/expert${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 👤 Consumers
  if (subdomain === "app") {
    url.pathname = `/consumer${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 🏠 Localhost or root domain → default consumer
  url.pathname = `/consumer${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
