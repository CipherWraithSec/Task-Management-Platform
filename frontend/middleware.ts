import { NextRequest } from "next/server";
import { authenticated } from "./app/actions";
import { unauthenticatedRoutes } from "./app/lib/constants/routes";

export async function middleware(request: NextRequest) {
  // check for authorization cookie on the request
  const auth = await authenticated();

  // executes if we're unauthorized and are not on any of the unauthorized routes
  if (
    !auth &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.path)
    )
  ) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

// custom matcher to stop middleware from blocking any static assets based on the regular expression. It will run only for underlying pages in app
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
