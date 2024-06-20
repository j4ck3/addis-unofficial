import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { CustomMiddleware } from './chain'
import { auth } from '@/auth.config'

const protectedPaths = ['/interviews']

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
	let protectedPathsWithLocale = [...protectedPaths]

	protectedPaths.forEach((route) => {
		locales.forEach(
			(locale) =>
				(protectedPathsWithLocale = [
					...protectedPathsWithLocale,
					`/${locale}${route}`,
				]),
		)
	})

	return protectedPathsWithLocale
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		// Create a response object to pass down the chain
		const response = NextResponse.next()

		const token = await auth()

		// @ts-ignore
		request.nextauth = request.nextauth || {}
		// @ts-ignore
		request.nextauth.token = token
		const pathname = request.nextUrl.pathname

		const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
			...['en', 'sv'],
		])

		if (!token && protectedPathsWithLocale.includes(pathname)) {
			const signInUrl = new URL('/api/auth/signin', request.url)
			signInUrl.searchParams.set('callbackUrl', pathname)
			return NextResponse.redirect(signInUrl)
		}

		return middleware(request, event, response)
	}
}
