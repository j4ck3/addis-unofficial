import React, { useEffect, useState } from 'react'
import R_R_E_C from '../inputs/R_R_E_C'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

const R_R_E_C_Form: React.FC<Props> = ({ interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer.answers ?? [])
	const handleAnswerChange = (selectedOption: string, optionId: number) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)
		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = {
				optionId,
				selectedOption,
			}
		} else {
			updatedAnswers.push({ optionId, selectedOption })
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
					<div className='text-sm text-center'>Nej</div>
					<div className='text-sm text-center'>Ja</div>
					<div className='text-sm text-center'>
						<i className='bi bi-arrow-right'></i>
					</div>
					<div className='text-sm text-center'>Senaste året</div>
				</div>
			</div>

			{interview?.substances.categories != null &&
				Object.keys(interview.substances.categories).map((categoryKey) => {
					const category = interview.substances.categories[categoryKey][0]

					return (
						category && (
							<R_R_E_C
								key={category.id}
								label={categoryKey}
								onChange={handleAnswerChange}
								optionId={parseInt(category.id)}
								answers={answers}
							/>
						)
					)
				})}
		</>
	)
}

export default R_R_E_C_Form
