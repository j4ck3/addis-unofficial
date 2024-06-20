import React, { useEffect, useMemo, useState } from 'react'
import S_T from '../inputs/S_T'
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

const S_T_Form: React.FC<Props> = ({ question, interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer.answers || [])

	const handleAnswerChange = (optionId: string, selectedId: string, age: string) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)
		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = {
				optionId,
				selectedId,
				age,
			}
		} else {
			updatedAnswers.push({ optionId, selectedId, age })
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
				<div className='grid grid-cols-2'>
					<div className='text-sm'>Kod</div>
					<div className='text-sm'>Ålder</div>
				</div>
			</div>

			{interview?.substances.categories != null &&
				Object.keys(interview.substances.categories).map((categoryKey) => {
					const category = interview.substances.categories[categoryKey][0]

					return (
						category && (
							<S_T
								key={category.id}
								optionId={categoryKey}
								options={question.options}
								label={categoryKey}
								onChange={handleAnswerChange}
								answers={answers}
							/>
						)
					)
				})}
		</>
	)
}

export default S_T_Form
