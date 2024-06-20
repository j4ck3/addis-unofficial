import React, { useEffect, useState } from 'react'
import R_R_R_R_C_T from '../inputs/R_R_R_R_C_T'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	interview: InterviewSchema
	answer: InterviewAnswer
}

const Debut_2_Form: React.FC<Props> = ({ interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params
	const [answers, setAnswers] = useState<OptionAnswers[]>(answer?.answers ?? [])

	const handleAnswerChange = (
		optionId: string,
		selectedOption: string,
		checkedOption: string,
		debut: string,
		selectedAmont: string,
	) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)
		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = {
				optionId,
				selectedOption,
				checkedOption,
				debut,
				selectedAmont,
			}
		} else {
			updatedAnswers.push({
				optionId,
				selectedOption,
				checkedOption,
				debut,
				selectedAmont,
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
				<div className='grid grid-cols-6'>
					<div className='text-sm text-center w-20'>Nej</div>
					<div className='text-sm text-center w-20'>Ja</div>
					<div className='col-span-2'>
						<div className='grid grid-cols-2'>
							<div className='col-span-2 text-sm text-center'>
								Antal gånger senaste året
							</div>
							<div className='text-sm text-center mt-2 w-20'>1</div>
							<div className='text-sm text-center mt-2 w-20'>2+</div>
						</div>
					</div>
					<div className='text-sm text-center w-20'>Senaste månaden</div>
					<div className='text-sm text-center w-20'>Debut</div>
				</div>
			</div>
			{interview?.substances.categories != null &&
				Object.keys(interview.substances.categories).map((categoryKey) => {
					const category = interview.substances.categories[categoryKey][0]

					return (
						category && (
							<R_R_R_R_C_T
								key={category.id}
								onChange={handleAnswerChange}
								label={categoryKey}
								optionId={categoryKey}
								answers={answers}
							/>
						)
					)
				})}
		</>
	)
}

export default Debut_2_Form
