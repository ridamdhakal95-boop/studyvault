import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const secret=new TextEncoder().encode(process.env.AUTH_SECRET||"development-only-secret-change-me");
export async function middleware(req:NextRequest){if(!req.nextUrl.pathname.startsWith("/admin"))return NextResponse.next();const token=req.cookies.get("exam_prep_session")?.value;if(!token)return NextResponse.redirect(new URL("/login",req.url));try{await jwtVerify(token,secret);return NextResponse.next()}catch{return NextResponse.redirect(new URL("/login",req.url));}}
export const config={matcher:["/admin/:path*"]};
