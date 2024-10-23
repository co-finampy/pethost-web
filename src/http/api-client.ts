import ky from "ky"
import type { CookiesFn } from 'cookies-next/lib/types'
import { getCookie } from 'cookies-next'

export const api = ky.create({
  prefixUrl: process.env.API_CLIENT,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if(typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookieStore = serverCookies
        }

        const token = getCookie('token', { cookies: cookieStore })
        
        if(token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    ]
  }
})