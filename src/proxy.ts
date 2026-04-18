import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/reset-password",
  "/email-confirm",
  "/verify-email",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refresh_token")?.value;
  console.log(token);

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  // Не авторизован + закрытая страница -> на логин
  if (!token && !isPublic) {
    console.log("Вы не авторизованы!");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Авторизован + страница логина -> на ленту
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
