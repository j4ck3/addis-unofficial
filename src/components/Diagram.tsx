'use client'
import React, { FC } from 'react'

import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import { CriteriaSchema } from '@/models/schemas/CriteriaSchema'

interface Props {
	interview: InterviewSchema
	criterias: CriteriaSchema
}

const Diagram: FC<Props> = ({ interview, criterias }) => {
	const countAsForFirstSymptoms = () => {
		const aCounts: { [key: string]: { [key: string]: number } } = {}

		criterias?.criterias.forEach((criteria) => {
			criteria.symptoms.forEach((symptom) => {
				symptom.answers?.symptomAnswers.forEach((answer: any) => {
					if (answer.code === 'A') {
						if (!aCounts[answer.option]) {
							aCounts[answer.option] = {}
						}
						if (aCounts[answer.option][criteria.id]) {
							aCounts[answer.option][criteria.id]++
						} else {
							aCounts[answer.option][criteria.id] = 1
						}
					}
				})
			})
		})

		const result = Object.keys(aCounts).map((option) => ({
			option,
			symptomCount: Object.values(aCounts[option]).reduce((acc, val) => acc + val, 0),
			criteriaCount: Object.keys(aCounts[option]).length,
		}))
		result.sort((a, b) => a.option.localeCompare(b.option))

		console.log(result)
		return result
	}

	const firstSymptomAsCounts = countAsForFirstSymptoms()

	return (
		<>
			<div className='grid grid-cols-2 p-0'>
				<div>A = Aktuell, L = Livstid, A1 = En gång under senaste året</div>
				<div className='grid grid-cols-12'>
					<div className='w-12 flex items-end [writing-mode:sideways-lr]'>
						Fråga nr.
					</div>
					{interview &&
						Object.keys(interview?.substances.categories)
							.sort((a, b) => a.localeCompare(b))
							.map((categoryName, index) => (
								<div
									key={index}
									className='w-12 flex items-end [writing-mode:sideways-lr] capitalize'
								>
									{categoryName}
								</div>
							))}
				</div>
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
								className={`grid grid-cols-2 rounded-sm ${
									index % 2 === 0 ? '' : 'bg-green-100'
								}`}
							>
								{/* symptom name */}
								<div className='ms-3 p-0 m-0 flex items-center'>
									{symptom.questionId}
									{'. '}
									{symptom.symptom}
								</div>
								<div className='grid grid-cols-12 my-1'>
									{/* symptom questionId */}
									<div key={index} className='text-end p-0 m-0 w-12 h-6'>
										{symptom.questionId}
									</div>

									{/* symptom answers */}
									{symptom.answers?.symptomAnswers
										.filter((answer: { option: string }) =>
											Object.keys(interview?.substances.categories).includes(
												answer.option,
											),
										)
										.sort((a: { option: string }, b: { option: any }) =>
											a.option.localeCompare(b.option),
										)
										.map((answer: any, answerIndex: number) => (
											<div
												key={answerIndex}
												className='text-end p-0 m-0 w-12 flex justify-end font-bold'
											>
												<div className='text-sm pe-1'>{answer.code}</div>
											</div>
										))}
								</div>
							</div>
						))}
					</div>
				))}

			<div className='grid grid-cols-2 mt-3'>
				<div className='grid grid-cols-12 my-1 col-start-2'>
					<div className='p-0 m-0 w-12'></div>
					{firstSymptomAsCounts.map((item, index) => (
						<div className='text-end p-0 m-0 w-12 font-bold' key={index}>
							{item.symptomCount}/{item.criteriaCount}
						</div>
					))}
				</div>
			</div>

			<div className='grid grid-cols-2 my-3'>
				<div className='grid grid-cols-12 col-start-2'>
					<div className='w-12 flex items-end justify-end [writing-mode:sideways-lr]'>
						Fråga nr.
					</div>
					{interview &&
						Object.keys(interview?.substances.categories)
							.sort((a, b) => a.localeCompare(b))
							.map((categoryName, index) => (
								<div
									key={index}
									className='w-12 flex items-end justify-end [writing-mode:sideways-lr] capitalize'
								>
									{categoryName}
								</div>
							))}
				</div>
			</div>
		</>
	)
}
export default Diagram
