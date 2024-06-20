import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
	label: string
	optionId: number
	onChange: (selectedOption: string, optionId: number) => void
	answers: OptionAnswers[]
}

const R_R_E_C: React.FC<Props> = ({ label, onChange, optionId, answers }) => {
	const selectedOptionInitValule = () => {
		if (
			answers.find((answer: any) => answer.optionId === optionId)?.selectedOption ===
			'yes'
		) {
			return 'yes'
		} else return 'no'
	}

	const [selectedOption, setSelectedOption] = useState<string>(
		selectedOptionInitValule(),
	)
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value)
	}

	useEffect(() => {
		const fetchData = async () => {
			onChange(selectedOption || '', optionId)
		}

		fetchData()
	}, [selectedOption])
	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='capitalize'>{label}</div>
				<div className='grid grid-cols-4'>
					<input
						type='radio'
						value={'no'}
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.selectedOption === 'no'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						value={'yes'}
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.selectedOption === 'yes'
						}
						onChange={handleOptionChange}
					/>
					<div></div>
					<input
						type='checkbox'
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.selectedOption === 'yes'
						}
					/>
				</div>
			</div>
		</>
	)
}

export default R_R_E_C
