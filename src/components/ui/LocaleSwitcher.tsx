'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function LocalSwitcher() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const localActive = useLocale()

	const onClickHandler = (locale: string) => {
		const nextLocale = locale
		startTransition(() => {
			router.replace(`/${nextLocale}`)
		})
	}
	return (
		<DropdownMenu>
			<div className='border rounded'>
				<DropdownMenuTrigger className='capitalize px-3 py-1'>
					<i className='bi bi-globe me-2 text-sm'></i>
					{localActive}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						className='p-2 hover:bg-slate-700 cursor-pointer'
						onClick={() => onClickHandler('en')}
					>
						English
					</DropdownMenuItem>
					<DropdownMenuItem
						className='p-2 hover:bg-slate-700 cursor-pointer'
						onClick={() => onClickHandler('sv')}
					>
						Svenska
					</DropdownMenuItem>
				</DropdownMenuContent>
			</div>
		</DropdownMenu>
	)
}
