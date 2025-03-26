import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";


const protectedRoutes = ["/dashboard", "/project", "/task"]

const jwt_secret = process.env.JWT_SECRET || ""

export function middleware(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get("access_token")


    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !token?.value) {
        const loginUrl = new URL("/", req.url);
        return NextResponse.redirect(loginUrl);

    }


    if (isProtectedRoute && !(verifyToken(token?.value || ""))) {
        const loginUrl = new URL("/", req.url);
        return NextResponse.redirect(loginUrl);

    }
    




    return NextResponse.next()



}

export const config = {
    matcher: ["/dashboard/:path*", "/project/:path*", "/task/:path*"],
};
