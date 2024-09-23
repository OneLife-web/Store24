// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Import this if you're using JWT

export async function middleware(req: NextRequest) {
  // Check if the user is authenticated
  const token = await getToken({ req });

  // Define the paths that you want to protect
  const protectedPaths = ["/profile", "/dashboard"]; // Add your protected routes here

  // Check if the requested path is protected
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // If authenticated or not protected, continue to the requested page
  return NextResponse.next();
}

// You can specify which paths the middleware should run on
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"], // Add paths to match
};
