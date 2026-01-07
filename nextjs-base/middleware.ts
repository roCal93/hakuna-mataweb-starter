import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './src/lib/locales'

export const runtime = 'edge'

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl

    // Ignore static assets, API and other non-page requests
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static') || pathname.includes('.')) {
      return NextResponse.next()
    }

    const segments = pathname.split('/').filter(Boolean)
    const first = segments[0]
    const locale = (first && (locales as readonly string[]).includes(first)) ? first : defaultLocale

    // If the first segment is not a supported locale, rewrite the URL
    // to include the `defaultLocale` prefix so routing matches
    if (!first || !(locales as readonly string[]).includes(first)) {
      const url = req.nextUrl.clone()
      url.pathname = `/${locale}${url.pathname}`

      const rewriteRes = NextResponse.rewrite(url)
      try {
        rewriteRes.cookies.set({
          name: 'locale',
          value: locale,
          path: '/',
          sameSite: 'lax',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
        })
      } catch (err) {
        const cookieValue = `locale=${encodeURIComponent(locale)}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${process.env.NODE_ENV === 'production' ? '; Secure; HttpOnly' : ''}`
        rewriteRes.headers.set('set-cookie', cookieValue)
      }

      return rewriteRes
    }

    const res = NextResponse.next()

    try {
      // Prefer the Cookies API when available (sets HttpOnly cookie)
      res.cookies.set({
        name: 'locale',
        value: locale,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      })
    } catch (err) {
      // Fallback to setting header
      const cookieValue = `locale=${encodeURIComponent(locale)}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${process.env.NODE_ENV === 'production' ? '; Secure; HttpOnly' : ''}`
      res.headers.set('set-cookie', cookieValue)
    }

    return res
  } catch (err) {
    return NextResponse.next()
  }
}

// Match all non-api and non-_next routes
export const config = {
  matcher: ['/((?!_next|api|static).*)'],
}
