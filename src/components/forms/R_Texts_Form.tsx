import React, { useEffect, useState } from 'react'
import Text from '../inputs/Text'
import RadioGroup from '../inputs/Radio'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { useParams } from 'next/navigation'
import { InterviewAnswer } from '@/models/schemas/InterviewSchema'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	answer: InterviewAnswer
}

const R_Texts_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const [textValues, setTextValues] = useState<string[]>([
		answer?.quantity || '',
		answer?.debut || '',
	])
	const [selectedOption, setSelectedOption] = useState<number | null>(
		answer?.optionId || null,
	)

	const handleTextChange = (index: number, value: string) => {
		const newTextValues = [...textValues]
		newTextValues[index] = value
		setTextValues(newTextValues)
	}

	const handleOptionChange = (value: number) => {
		setSelectedOption(value)
	}

	useEffect(() => {
		const update = async () => {
			try {
				if (id && questionId) {
					let newAnswer = {
						iid: id,
						qid: questionId,
						debut: textValues[1] ?? '',
						optionId: selectedOption ?? '',
					}

					await createOrUpdateAnswer(newAnswer)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [questionId, textValues, selectedOption])
	return (
		<>
			{question.options && question.options.length > 0 && (
				<>
					<RadioGroup
						options={question.options}
						selectedOption={selectedOption}
						onOptionChange={handleOptionChange}
					/>
				</>
			)}

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

export default R_Texts_Form
