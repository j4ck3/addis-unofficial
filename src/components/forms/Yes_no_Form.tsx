import React, { useEffect, useState } from 'react'
import Text from '../inputs/Text'
import Yes_No from '../inputs/Yes_No'
import { useParams } from 'next/navigation'
import { InterviewAnswer } from '@/models/schemas/InterviewSchema'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	answer: InterviewAnswer
}

const Yes_No_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { questionId, id } = params
	const [isSelected, setIsSelected] = useState<boolean>(
		answer?.checkbox ?? false,
	)
	const [textValues, setTextValues] = useState<string[]>([
		'',
		answer?.howMany ?? '',
		answer?.ages ?? '',
	])

	const handleYesNoChange = (newSelected: boolean) => {
		setIsSelected(newSelected)
	}

	const handleTextChange = (index: number, value: string) => {
		const newTextValues = [...textValues]
		newTextValues[index] = value
		setTextValues(newTextValues)
	}

	useEffect(() => {
		try {
			if (id && questionId) {
				const newAnswer = {
					iid: id,
					qid: questionId,
					checkbox: isSelected,
					howMany: isSelected ? textValues[1] : null,
					ages: isSelected ? textValues[2] : null,
				}
				createOrUpdateAnswer(newAnswer)
			}
		} catch (error) {
			console.log(error)
		}
	}, [questionId, isSelected, textValues])

	return (
		<>
			<Yes_No isSelected={isSelected} onOptionChange={handleYesNoChange} />
			{!isSelected || (
				<>
					{question.textOptions &&
						question.textOptions.length > 0 &&
						question.textOptions.map((option: any) => (
							<Text
								key={option.id}
								label={option.label}
								onChange={(value: string) => handleTextChange(option.id, value)}
								value={textValues[option.id]}
							/>
						))}
				</>
			)}
		</>
	)
}

export default Yes_No_Form
