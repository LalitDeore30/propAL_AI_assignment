import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const userCookie = request.cookies.get('user')

    // Protected routes
    if (pathname.startsWith('/dashboard')) {
        if (!userCookie) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Public routes when logged in
    if ((pathname === '/login' || pathname === '/signup') && userCookie) {
        return NextResponse.redirect(new URL('/dashboard/profile', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup']
} 