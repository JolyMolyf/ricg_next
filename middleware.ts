import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;
    const protectedRoutes = ["/profile", '/user'];
    const authRoutes = ["/login"];
    const publicRoutes = ["/about", "/"];
    if (
        protectedRoutes.includes(request.nextUrl.pathname) &&
        (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
    ) {
        request.cookies.delete("currentUser");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("currentUser");
        console.log('Here');
        return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
}