import React, { useEffect, useState } from 'react'
import S_T_T from '../inputs/S_T_T'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema, OptionAnswers } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

const S_T_T_Form: React.FC<Props> = ({ question, interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer.answers || [])

	const handleAnswerChange = (
		optionId: string,
		selectedId: string,
		debut: string,
		age: string,
	) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)
		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = {
				optionId,
				selectedId,
				debut,
				age,
			}
		} else {
			updatedAnswers.push({ optionId, selectedId, debut, age })
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
				<div className='grid grid-cols-3'>
					<div className='text-sm'>Kod</div>
					<div className='text-sm'>Debut</div>
					<div className='text-sm'>Ålder reg.bruk</div>
				</div>
			</div>

			{interview?.substances.categories != null &&
				Object.keys(interview.substances.categories).map((categoryKey) => {
					const category = interview.substances.categories[categoryKey][0]

					return (
						category && (
							<S_T_T
								key={category.id}
								options={question.options}
								optionId={categoryKey}
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

export default S_T_T_Form
