'use client'
import React, { FC, useState } from 'react'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import { CriteriaSchema } from '@/models/schemas/CriteriaSchema'

interface Props {
	interview: InterviewSchema
	criterias: CriteriaSchema
}

const PedagogicChecklistDiagram: FC<Props> = ({ interview, criterias }) => {
	const [selectedValue, setSelectedValue] = useState('')

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value)
	}
	return (
		<>
			<div className='w-64'>
				<select
					className='block w-full my-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 capitalize font-sans'
					value={selectedValue}
					onChange={handleChange}
				>
					{interview &&
						Object.keys(interview?.substances.categories)
							.sort((a, b) => a.localeCompare(b))
							.map((categoryName, index) => (
								<option
									key={index}
									value={categoryName}
									className='font-sans'
								>
									{categoryName}
								</option>
							))}
				</select>
			</div>
			{criterias &&
				criterias.criterias.map((criteria) => (
					<div className='mb-3' key={criteria.id}>
						{/* criteria name */}
						<div className='grid grid-cols-2'>
							<div className='font-bold text-md m-0'>
								{criteria.id}. {criteria.criteria}
							</div>
						</div>
						{/* symptoms */}
						{criteria.symptoms.map((symptom, index) => (
							<div
								key={index}
								className={`rounded-sm grid grid-cols-3 ${
									index % 2 === 0 ? '' : 'bg-green-100'
								}`}
							>
								<div className='col-span-2  ms-5 grid grid-cols-6'>
									{symptom.answers?.symptomAnswers
										.filter(
											(answer: any) =>
												Object.keys(
													interview?.substances.categories,
												).includes(answer.option) &&
												answer.option === selectedValue,
										)
										.sort((a: { option: string }, b: { option: any }) =>
											a.option.localeCompare(b.option),
										)
										.map((answer: any, answerIndex: number) => (
											<span key={answerIndex} className='text-sm'>
												{answer.code ? answer.code : '-'}
											</span>
										))}
									<div>{symptom.questionId}</div>
									<div className='col-span-4'>{symptom.symptom}</div>
								</div>
							</div>
						))}
					</div>
				))}
		</>
	)
}

export default PedagogicChecklistDiagram
