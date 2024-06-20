import React, { useEffect, useState } from 'react'
import R_R_R_R from '../inputs/R_R_R_R'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import {
	InterviewAnswer,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	answer: InterviewAnswer
}

const R_R_R_R_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { questionId, id } = params
	const [answers, setAnswers] = useState<OptionAnswers[]>(answer.answers || [])

	const handleAnswerChange = (optionId: number, value: string) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)

		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = { optionId, value }
		} else {
			updatedAnswers.push({
				optionId,
				value,
			})
		}

		setAnswers(updatedAnswers)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (id && questionId) {
					const newAnswer = {
						iid: id,
						qid: questionId,
						answers,
					}
					await createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [questionId, answers])

	return (
		<>
			<div className='grid grid-cols-2'>
				<div></div>
				<div className='grid grid-cols-4'>
					<div className='text-sm text-center'>Inte alls</div>
					<div className='text-sm text-center'>Flera dagar</div>
					<div className='text-sm text-center'>Flertalet dagar</div>
					<div className='text-sm text-center'>Dagligen</div>
				</div>
			</div>

			{question.options &&
				question.options.length > 0 &&
				question.options.map((option: any) => (
					<R_R_R_R
						key={option.id}
						label={option.label}
						onChange={handleAnswerChange}
						optionId={option.id}
						answers={answers}
					/>
				))}
		</>
	)
}

export default R_R_R_R_Form
