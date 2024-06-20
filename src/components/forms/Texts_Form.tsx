import React, { useEffect, useState } from 'react'
import Text from '../inputs/Text'
import { useParams } from 'next/navigation'
import { InterviewAnswer, InterviewSchema, OptionAnswers } from '@/models/schemas/InterviewSchema'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

const Texts_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { id, questionId } = params

	const [textValues, setTextValues] = useState<string[]>([
		'',
		answer?.week || '',
		answer?.month || '',
		answer?.halfYear || '',
		answer?.year || '',
		answer?.overAYear || '',
	])

	const handleTextChange = (index: number, value: string) => {
		const newTextValues = [...textValues]
		newTextValues[index] = value
		setTextValues(newTextValues)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (id && questionId) {
					let newAnswer = {
						iid: id,
						qid: questionId,
						week: textValues[1] ?? '',
						month: textValues[2] ?? '',
						halfYear: textValues[3] ?? '',
						year: textValues[4] ?? '',
						overAYear: textValues[5] ?? '',
					}

					await createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [questionId, textValues])
	return (
		<>
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

export default Texts_Form
