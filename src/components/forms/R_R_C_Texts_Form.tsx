import React, { useEffect, useState } from 'react'
import R_R_C from '../inputs/R_R_C'
import Text from '../inputs/Text'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema, OptionAnswers } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

const R_R_C_Texts_Form: React.FC<Props> = ({ question, interview, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [answers, setAnswers] = useState<OptionAnswers[]>(answer?.answers || [])
	const [textValues, setTextValues] = useState<string[]>([])
	const handleTextChange = (index: number, value: string) => {
		const newTextValues = [...textValues]
		newTextValues[index] = value
		setTextValues(newTextValues)
	}

	const handleAnswerChange = (
		optionId: number,
		checkbox: boolean,
		value: string,
	) => {
		const updatedAnswers = [...answers]
		const existingIndex = updatedAnswers.findIndex(
			(answer) => answer.optionId === optionId,
		)
		if (existingIndex !== -1) {
			updatedAnswers[existingIndex] = { optionId, value, checkbox }
		} else {
			updatedAnswers.push({
				optionId,
				checkbox,
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
						debut: textValues[1] || '',
						lastTime: textValues[2] || '',
					}

					await createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [interview, questionId, answers, textValues])

	return (
		<>
			<div className='grid grid-cols-2'>
				<div></div>
				<div className='grid grid-cols-3'>
					<div className='text-sm text-center'>Nej</div>
					<div className='text-sm text-center'>Ja</div>
					<div className='text-sm text-center'>Aktuellt (senaste 2 v.)</div>
				</div>
			</div>
			{question.options &&
				question.options.length > 0 &&
				question.options.map((option: any) => (
					<R_R_C
						key={option.id}
						label={option.label}
						onChange={handleAnswerChange}
						optionId={option.id}
						answers={answers}
					/>
				))}
			{question.textOptions &&
				question.textOptions.length > 0 &&
				question.textOptions.map((textLabel: any) => (
					<Text
						key={textLabel.id}
						label={textLabel.label}
						onChange={(value: string) => handleTextChange(textLabel.id, value)}
						value={textValues[textLabel.id]}
					/>
				))}
		</>
	)
}

export default R_R_C_Texts_Form
