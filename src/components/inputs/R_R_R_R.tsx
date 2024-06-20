import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import React, { ChangeEvent } from 'react'

interface Props {
	label: string
	optionId: number
	onChange: (optionId: number, value: string) => void
	answers: OptionAnswers[]
}

const R_R_R_R: React.FC<Props> = ({ label, optionId, onChange, answers }) => {
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(optionId, event.target.value)
	}

	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='normal-case'>{label}</div>
				<div className='grid grid-cols-4'>
					<input
						type='radio'
						className='h-6'
						value='never'
						checked={
							answers.find((answer: OptionAnswers) => answer.optionId === optionId)
								?.value === 'never'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						className='h-6'
						value='couple_of_days'
						checked={
							answers.find((answer: OptionAnswers) => answer.optionId === optionId)
								?.value === 'couple_of_days'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						className='h-6'
						value='several_days'
						checked={
							answers.find((answer: OptionAnswers) => answer.optionId === optionId)
								?.value === 'several_days'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						className='h-6'
						value='daily'
						checked={
							answers.find((answer: OptionAnswers) => answer.optionId === optionId)
								?.value === 'daily'
						}
						onChange={handleOptionChange}
					/>
				</div>
			</div>
		</>
	)
}

export default R_R_R_R
