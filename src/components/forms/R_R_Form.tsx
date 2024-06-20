import React, { useEffect, useState } from 'react'
import R_R from '../inputs/R_R'
import { useParams } from 'next/navigation'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'

interface Props {
	interview: InterviewSchema
	answer: InterviewAnswer
	question: QuestionSchema
}

const R_R_Form: React.FC<Props> = ({ interview, answer, question }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer?.answers || [])

	const handleAnswerChange = (optionId: number, value: string) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)

		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = { optionId, value }
		} else {
			updatedAnswers.push({ optionId, value })
		}

		setAnswers(updatedAnswers)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (answers.length > 0) {
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
	}, [interview, questionId, answers])

	return (
		<>
			<div className='grid grid-cols-2'>
				<div></div>
				<div className='grid grid-cols-2'>
					<div className='text-sm text-center'>Nej</div>
					<div className='text-sm text-center'>Ja</div>
				</div>
			</div>

			{question?.options != null
				? 
					Object.keys(question.options).map((optionKey) => {
						const option = question.options[optionKey]
						return (
							<R_R
								key={option.id}
								label={option.label}
								onChange={handleAnswerChange}
								optionId={parseInt(option.id)}
								answers={answers}
							/>
						)
					})
				:
					interview?.substances?.categories != null &&
					Object.keys(interview.substances.categories).map((categoryKey) => {
						const category = interview.substances.categories[categoryKey][0]
						return (
							category && (
								<R_R
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

export default R_R_Form
