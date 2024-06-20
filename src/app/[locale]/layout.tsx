import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import Nav from '@/components/Nav'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ADDIS',
	description: 'Alkohol- & drogdiagnosintrument',
}

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	return (
		<html lang={locale}>
			<head>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
				/>
				<link
					href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
					rel='stylesheet'
					integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
					crossOrigin='anonymous'
				/>
			</head>
			<body className={inter.className}>
				<Nav />
				{children}
			</body>
		</html>
	)
}
