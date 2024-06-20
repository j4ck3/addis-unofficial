import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface Props {
	interviews: InterviewSchema[]
}
const InterviewTable: NextPage<Props> = ({ interviews }) => {
	return (
		<>
			<div>
				<table className='w-full mt-2 rounded-md overflow-hidden'>
					<thead>
						<tr className='bg-green-500 text-white'>
							<th className='py-2 px-4'>Datum</th>
							<th className='py-2 px-4'>UNO-kod</th>
							<th className='py-2 px-4'>Intervjuare</th>
							<th className='py-2 px-4'>Formulär Typ</th>
							<th className='py-2 px-4'>Status</th>
							<th className='py-2 px-4'></th>
						</tr>
					</thead>
					<tbody>
						{interviews.map((item, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-green-300' : 'bg-green-200'}
							>
								<td className='py-2 px-4'>{item.created}</td>
								<td className='py-2 px-4'>{item.uno}</td>
								<td className='py-2 px-4'>{item.interviewer}</td>
								<td className='py-2 px-4'>{item.formType}</td>
								<td className='py-2 px-4 capitalize'>{item.status}</td>
								<td className='py-2 px-4'>
									<div className='flex justify-end'>
										<Link
											className='bg-white py-1 px-3 text-black no-underline rounded'
											href={`/client/${item.id}`}
										>
											Öppna klientsida
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default InterviewTable
