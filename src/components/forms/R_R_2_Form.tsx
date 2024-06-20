import React, { ChangeEvent, useEffect, useState } from 'react'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	answer: InterviewAnswer
}

const R_R_2_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [optionYear, setOptionYear] = useState<string | null>(
		answer?.optionYear ?? '',
	)
	const [optionMonth, setOptionMonth] = useState<string | null>(
		answer?.optionMonth ?? '',
	)

	const handleOptionMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setOptionMonth(value)
	}

	const handleOptionYearChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value

		if (value === '1' || value === '2') {
			setOptionMonth('')
			setOptionYear(value)
		} else {
			setOptionYear(value)
		}
	}
	console.log(optionMonth, optionYear)

	useEffect(() => {
		const update = async () => {
			try {
				if (id && questionId) {
					let newAnswer
					if (optionYear === '1' || optionYear === '2') {
						newAnswer = {
							iid: id,
							qid: questionId,
							optionYear: optionYear,
						}
					} else {
						newAnswer = {
							iid: id,
							qid: questionId,
							optionMonth: optionMonth,
							optionYear: optionYear,
						}
					}

					createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [questionId, optionYear, optionMonth])

	return (
		<>
			<div className='grid grid-cols-2'>
				<div></div>
				<div className='grid grid-cols-2'>
					<div className='text-sm text-center'>Senaste året</div>
					<div className='text-sm text-center'>Senaste månaden</div>
				</div>
			</div>

			{question.R_R_options?.map((option: any) => (
				<div className='grid grid-cols-4 p-3' key={`pastYear_${option.id}`}>
					<label className='cursor-pointer hover:text-slate-400'>
						{option.label}
					</label>
					<div></div>
					<input
						value={`pastYear_${option.id.toString()}`}
						type='radio'
						name='radioGroup1'
						checked={`pastYear_${option.id.toString()}` === optionYear}
						onChange={handleOptionYearChange}
					/>
					<input
						value={`pastMonth_${option.id.toString()}`}
						type='radio'
						name='radioGroup2'
						checked={`pastMonth_${option.id.toString()}` === optionMonth}
						disabled={optionYear === '1' || optionYear === '2'}
						onChange={handleOptionMonthChange}
					/>
				</div>
			))}
			{question.options?.map((option: any) => (
				<div className='grid grid-cols-4 p-3' key={option.id}>
					<label className='cursor-pointer hover:text-slate-400'>
						{option.label}
					</label>
					<div></div>
					<input
						value={`${option.id.toString()}`}
						checked={`${option.id.toString()}` === optionYear}
						type='radio'
						name='radioGroup1'
						onChange={handleOptionYearChange}
					/>
				</div>
			))}
		</>
	)
}

export default R_R_2_Form
