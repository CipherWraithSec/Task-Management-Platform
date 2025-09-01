import { NextRequest } from "next/server";

// dont need authentication for these
const unauthorizedRoutes = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
  // check for authorization cookie on the request
  const auth = request.cookies.get("Authentication")?.value;

  // executes if we're unauthorized and are not on any of the unauthorized routes
  if (
    !auth &&
    !unauthorizedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

// custom matcher to stop middleware from blocking any static assets based on the regular expression. It will run only for underlying pages in app
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
