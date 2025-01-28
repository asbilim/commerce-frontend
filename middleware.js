// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(request) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const token = await getToken({ req: request });

  // Extract locale and validate
  const locale = pathname.split("/")[1] || "en";
  const isSupportedLocale = ["en", "fr"].includes(locale);

  // Redirect invalid locales to default locale
  if (!isSupportedLocale) {
    const parts = pathname.split("/").filter((p) => p);
    parts[0] = "en"; // Replace invalid locale with 'en'
    const newPathname = parts.length > 0 ? `/${parts.join("/")}` : "/en";
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  const basePath = `/${locale}`;
  const isAuthPath = pathname.startsWith(`${basePath}/auth/`);

  // Define protected routes (add more as needed)
  const protectedPaths = ["/profile", "/notifications"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(`${basePath}${path}`)
  );

  // Redirect logged-in users from auth pages
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL(basePath, request.url));
  }

  // Redirect non-logged-in users from protected pages
  if (!token && isProtectedPath) {
    const loginUrl = new URL(`${basePath}/auth/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts|manifest.json).*)",
  ],
};
