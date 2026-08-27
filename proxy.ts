import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { siteForHost } from "@/lib/domains";

export const proxy = clerkMiddleware((_, request: NextRequest) => {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();

  const site = siteForHost(request.headers.get("host"));
  if (site.key === "main") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = site.path;
  return NextResponse.rewrite(url);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:jpg|jpeg|png|svg|webp|avif|mp4|m4v|ico|webmanifest|txt|xml)$).*)",
  ],
};
