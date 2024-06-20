import React, { useEffect, useState } from 'react'
import Text from '../inputs/Text'
import Checkbox from '../inputs/Checkbox'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

type option = {
	id: number
	label: string
}
const C_T_Forms: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { questionId, id } = params
	const [textValues, setTextValues] = useState<string[]>([
		answer?.quantity || '',
		answer?.debut || '',
	])
	const [isChecked, setIsChecked] = useState(answer.checked)

	const handleTextChange = (index: number, value: string) => {
		const newTextValues = [...textValues]
		newTextValues[index] = value
		setTextValues(newTextValues)
	}

	const handleCheckboxChange = (newCheckedState: boolean) => {
		setIsChecked(newCheckedState)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (id && questionId) {
					let newAnswer = {
						iid: id,
						qid: questionId,
						checked: isChecked,
						quantity: textValues[0] ?? '',
						debut: textValues[1] ?? '',
					}

					await createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [questionId, textValues, isChecked])

	return (
		<>
			<Checkbox
				label={'Har aldrig blivit berusad'}
				checked={isChecked}
				onChange={handleCheckboxChange}
			/>
			{!isChecked && (
				<>
					{question.options.map((option: option, index: number) => (
						<Text
							key={option.id}
							label={option.label}
							onChange={(value: string) => handleTextChange(index, value)}
							value={textValues[index]}
						/>
					))}
				</>
			)}
		</>
	)
}

export default C_T_Forms
