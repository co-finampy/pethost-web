import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(resquest: NextRequest) {
  const redirectUrl = resquest.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  cookies().delete('token')

  return NextResponse.redirect(redirectUrl)
}