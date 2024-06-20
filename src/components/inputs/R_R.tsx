import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import React, { ChangeEvent } from 'react'

interface Props {
	label: string
	optionId: number
	onChange: (optionId: number, value: string) => void
	answers: OptionAnswers[]
}

const R_R: React.FC<Props> = ({ label, optionId, onChange, answers }) => {
	const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(optionId, e.target.value)
	}

	return (
		<div className='grid grid-cols-2 p-3'>
			<div>{label}</div>
			<div className='grid grid-cols-2'>
				<input
					type='radio'
					value='no'
					checked={
						answers.find((answer) => answer.optionId === optionId)?.value === 'no'
					}
					onChange={handleOptionChange}
					className='h-6'
				/>
				<input
					type='radio'
					value='yes'
					checked={
						answers.find((answer) => answer.optionId === optionId)?.value === 'yes'
					}
					onChange={handleOptionChange}
					className='h-6'
				/>
			</div>
		</div>
	)
}

export default R_R
