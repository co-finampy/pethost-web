import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  iat: number,
  exp: number
}

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      console.log(decoded)
      return NextResponse.json(decoded)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }
  } else {
    return NextResponse.json({ error: 'Token not found' }, { status: 404 })
  }
}
