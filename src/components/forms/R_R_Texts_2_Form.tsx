import React, { useEffect, useState } from 'react'
import RadioGroup from '../inputs/Radio'
import Text from '../inputs/Text'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: InterviewAnswer
}

const R_R_Texts_2_Form: React.FC<Props> = ({ question, answer }) => {
	const params = useParams()
	const { id, questionId } = params

	const [textValues, setTextValues] = useState<string[]>([answer?.otherStay || ''])
	const [selectedOption, setSelectedOption] = useState<number | null>(
		answer.optionId ?? null,
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
				if (!id && !questionId) return
				const newAnswer = {
					iid: id,
					qid: questionId,
					otherStay: selectedOption === 4 ? textValues[1] : '',
					optionId: selectedOption,
				}
				await createOrUpdateAnswer(newAnswer)
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [textValues, selectedOption])

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

			{selectedOption === 4 &&
				question.textOptions &&
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

export default R_R_Texts_2_Form
