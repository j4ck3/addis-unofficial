import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { CustomMiddleware } from './chain'
import createMiddleware from 'next-intl/middleware'
const locales: string[] = ['en', 'sv']
function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	// @ts-ignore locales are readonly

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

	const locale = matchLocale(languages, locales, 'en')
	return locale
}

export function middleware(request: NextRequest) {}

export function withI18nMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
		const pathname = request.nextUrl.pathname
		const pathnameIsMissingLocale = locales.every(
			(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
		)

		// Redirect if there is no locale
		if (pathnameIsMissingLocale) {
			const locale = getLocale(request)
			return NextResponse.redirect(
				new URL(`/en${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
			)
		}

		const s = createMiddleware({
			// A list of all locales that are supported
			locales: ['en', 'sv'],

			// Used when no locale matches
			defaultLocale: 'en',
		})

		return s(request)
	}
}
