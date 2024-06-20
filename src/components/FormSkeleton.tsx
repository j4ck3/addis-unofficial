import React from 'react'

const FormSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='border rounded-md text-black text-sm p-2 inline-flex items-center no-underline bg-green-300'>
				<div className='bg-slate-400 py-2 px-20 rounded'></div>
			</div>
			<div className='flex justify-between space-x-2 my-8'>
				<div className='w-14 h-14 border rounded-md text-black p-4 inline-flex items-center mb-3 bg-green-300'>
					<div className='bg-slate-300 py-2 px-2 rounded'></div>
				</div>
				<div className='overflow-auto space-x-3 flex items-center w-full'>
					{Array.from({ length: 40 }, (_, index) => (
						<div
							key={index}
							className={
								'p-3 border rounded-md text-black inline-flex items-center mb-3'
							}
						>
							<div className='bg-slate-300 py-2 px-2 rounded'></div>
						</div>
					))}
				</div>
				<div className='w-14 h-14 border rounded-md text-black p-4 inline-flex items-center mb-3 bg-green-300'>
					<div className='bg-slate-300 py-2 px-2 rounded'></div>
				</div>
			</div>
		</div>
	)
}

export default FormSkeleton
