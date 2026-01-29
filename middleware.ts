import { NextRequest, NextResponse } from "next/server";

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const role = request.cookies.get("cnx_role")?.value;
  const uid = request.cookies.get("cnx_uid")?.value;

  // Redirect Firebase's default auth action URL to our custom page
  if (pathname === "/__/auth/action") {
    const customUrl = new URL("/auth/action", request.url);
    // Preserve all query parameters (mode, oobCode, apiKey, lang, etc.)
    searchParams.forEach((value, key) => {
      customUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(customUrl);
  }

  if (pathname.startsWith("/admin")) {
    if (!uid || role !== "ADMIN") {
      return redirectToLogin(request);
    }
  }

  if (pathname.startsWith("/student")) {
    if (!uid || !role || (role !== "STUDENT" && role !== "ADMIN")) {
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/__/auth/action"],
};
