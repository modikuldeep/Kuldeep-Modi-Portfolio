import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Must match routes in once-ui.config.ts - disabled routes return 404 for SEO
const DISABLED_ROUTES = ["/gallery"];

function isRouteDisabled(pathname: string): boolean {
  if (DISABLED_ROUTES.includes(pathname)) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isRouteDisabled(pathname)) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|.*\\..*).*)"],
};
