import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");
  if (!session) {
    return NextResponse.redirect(new URL("/signin?error=No User found", request.url));
  }
  const responseAPI = await fetch(new URL("/api/login", request.url), {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/signin?error=Not Logged In", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
