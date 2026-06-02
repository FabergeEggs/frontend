import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Страницы, доступные без токена
const PUBLIC_ROUTES = [
  "/feed",
  "/testcli",
  "/testsrv"
];

// Страницы только для неавторизованных (авторизованных — редиректим на /feed)
const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/reset-password",
  "/verify-email",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refresh_token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Не авторизован + закрытая страница -> на логин
  if (!token && !isPublic && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Авторизован + страница логина/регистрации -> на ленту
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
