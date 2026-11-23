import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const localize = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (
    searchParams.get("about") === "1" &&
    searchParams.get("view") !== "projects"
  ) {
    const locale = routing.locales.find(
      (language) => pathname === `/${language}`,
    );
    if (locale)
      return NextResponse.redirect(new URL(`/${locale}/sobre-mi`, request.url));
  }

  return localize(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|entrevista/material|.*\\..*).*)"],
};
