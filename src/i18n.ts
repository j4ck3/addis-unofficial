import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'sv']

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale as any)) notFound()

	return {
		messages: (await import(`../locales/common/navigation/${locale}.json`)).default,
	}
})
