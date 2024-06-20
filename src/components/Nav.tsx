'use server'
import React from 'react'
import Image from 'next/image'
import logo from '../../public/static/addis_logo.png'
import Link from 'next/link'
import { auth } from '@/auth.config'
import { getTranslations } from 'next-intl/server'
import LocalSwitcher from './ui/LocaleSwitcher'
export default async function Nav() {
	const session = await auth()
	const t = await getTranslations('navigation')
	return (
		<>
			<div className='container-fluid'>
				<div className='container'>
					<div className='flex justify-between items-center'>
						<Image
							className='my-2'
							src={logo}
							alt='addis'
							width={100}
							height={50}
						/>
						<LocalSwitcher />
					</div>
				</div>
			</div>

			<div className='container-fluid bg-green-600'>
				<div className='container'>
					<div className='flex py-4 justify-between'>
						<div className='space-x-10 text-sm'>
							<div className='group inline-block relative'>
								<Link
									className='group text-white no-underline hover:text-gray-300 py-4 capitalize'
									href='/interviews'
								>
									{t('interviews')}
								</Link>
							</div>
							<div className='group inline-block relative'>
								<Link
									className='text-white no-underline hover:text-gray-300 py-4 capitalize'
									href='/interviews'
								>
									{t('administer')}
								</Link>
								<div className='hidden group-hover:block absolute bg-white mt-2 py-2 space-y-2 shadow-md rounded-md'>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 1
									</Link>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 2
									</Link>
								</div>
							</div>
							<div className='group inline-block relative'>
								<Link
									className='group text-white no-underline hover:text-gray-300 py-4 capitalize'
									href='/interviews'
								>
									{t('manuals')}
								</Link>
								<div className='hidden group-hover:block absolute bg-white mt-2 py-2 space-y-2 shadow-md rounded-md '>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 1
									</Link>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 2
									</Link>
								</div>
							</div>
							<div className='group inline-block relative'>
								<Link
									className='group text-white no-underline hover:text-gray-300 py-4 capitalize'
									href='/interviews'
								>
									{t('questionnaire')}
								</Link>
								<div className='hidden group-hover:block absolute bg-white mt-2 py-2 space-y-2 shadow-md rounded-md '>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 1
									</Link>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 2
									</Link>
								</div>
							</div>
							<div className='group inline-block relative'>
								<Link
									className='group text-white no-underline hover:text-gray-300 py-4 capitalize'
									href='/interviews'
								>
									{t('logotypes')}
								</Link>
								<div className='hidden group-hover:block absolute bg-white mt-2 py-2 space-y-2 shadow-md rounded-md '>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 1
									</Link>
									<Link
										href='#'
										className='block px-4 py-2 text-gray-800 no-underline'
									>
										Item 2
									</Link>
								</div>
							</div>
						</div>
						<div className='whitespace-nowrap'>
							{session === null ? (
								<a
									className='text-green-700 text-sm bg-white px-3 py-2 rounded capitalize'
									href='/api/auth/signin'
								>
									{t('login')}
								</a>
							) : (
								<>
									{/* <span className="text-white text-sm me-2">{session?.user?.email}</span> */}
									<a
										className='text-green-700 no-underline text-sm bg-white px-3 py-2 rounded capitalize'
										href='/api/auth/signout'
									>
										{t('logout')}
									</a>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
