import React, { useEffect, useState } from 'react'
import R_R_C_C_T from '../inputs/R_R_C_C_T'
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

const Debut_Form: React.FC<Props> = ({ interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer.answers || [])

	const handleAnswerChange = (
		optionId: string,
		selectedOption: string,
		checkedOption: string,
		debut: string,
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
			}
		} else {
			updatedAnswers.push({ optionId, selectedOption, checkedOption, debut })
		}
		setAnswers(updatedAnswers)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (!id && !questionId) return
				let newAnswer = {
					iid: id,
					qid: questionId,
					answers,
				}
				await createOrUpdateAnswer(newAnswer)
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
				<div className='grid grid-cols-5'>
					<div className='text-sm text-center'>Nej</div>
					<div className='text-sm text-center'>Ja</div>
					<div className='text-sm text-center'>Senaste året</div>
					<div className='text-sm text-center'>Senaste månaden</div>
					<div className='text-sm text-center'>Debut</div>
				</div>
			</div>

			{questionId === '24' && (
				<>
					<R_R_C_C_T
						key={'alcohol'}
						onChange={handleAnswerChange}
						label={'alkohol'}
						optionId={'alcohol'}
						answer={answer}
					/>
				</>
			)}

			{questionId !== '24' &&
				interview?.substances?.categories != null &&
				Object.keys(interview.substances.categories).map((categoryKey) => {
					const category = interview.substances.categories[categoryKey][0]
					return (
						category && (
							<R_R_C_C_T
								key={category.id}
								onChange={handleAnswerChange}
								label={categoryKey}
								optionId={categoryKey}
								answer={answer}
							/>
						)
					)
				})}
		</>
	)
}

export default Debut_Form
