'use client'
import React from 'react'

import data from '../mock'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'

interface Props {
	interview: InterviewSchema
}

const Diagram: React.FC<Props> = ({ interview }) => {
	return (
		<>
			<div className='grid grid-cols-2 p-0'>
				<div>A = Aktuell, L = Livstid, A1 = En gång under senaste året</div>
				<div className='grid grid-cols-12'>
					{Array.from({ length: 12 }, (_, index) => (
						<div key={index} className='font-bold w-12 flex items-end [writing-mode:sideways-lr]'>
							Fråga nr.
						</div>
					))}
				</div>
			</div>

			{/* item */}
			{data.data.map((dataItem, index) => (
				<div key={index}>
					{/* mainQuestion */}
					<p className='font-bold text-md'>{dataItem.item.mainQuestion}</p>
					{/* underQuestionsList */}
					{dataItem.item.underQuestionsList.map((item, index) => (
						<div
							key={index}
							className={`grid grid-cols-2 ${
								index % 2 === 0 ? '' : 'bg-green-200'
							}`}
						>
							{/* question */}
							<p className='ms-3 p-0 m-0'>{item.question}</p>
							<div className='grid grid-cols-12 mt-2'>
								{/* answers */}
								{item.answers.map((str, index) => (
									<p key={index} className='text-end p-0 m-0 pe-2 w-12'>
										{str}
									</p>
								))}
							</div>
						</div>
					))}
				</div>
			))}
			<div className='grid grid-cols-2 mt-3'>
				<div className='grid grid-cols-12 mt-2 col-start-2'>
					{Array.from({ length: 12 }, (_, index) => (
						<p key={index} className='text-end p-0 m-0 w-12 font-bold'>
							0/0
						</p>
					))}
				</div>
			</div>

			<div className='grid grid-cols-2 mt-3'>
				<div className='grid grid-cols-12 col-start-2'>
					{Array.from({ length: 12 }, (_, index) => (
						<div key={index} className='font-bold w-12 flex items-end [writing-mode:sideways-lr]'>
							Fråga nr.
						</div>
					))}
				</div>
			</div>
		</>
	)
}
export default Diagram
