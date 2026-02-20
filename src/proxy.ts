import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/panel")) {
    return NextResponse.next();
  }

  const rawToken = request.cookies.get("auth_token")?.value;

  if (!rawToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const payload = jwtDecode<JwtPayload>(decodeURIComponent(rawToken));

    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/panel", "/panel/:path*"],
};
