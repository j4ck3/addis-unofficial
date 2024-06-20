import React, { ChangeEvent, useEffect, useState } from 'react'
import { InterviewAnswer, OptionAnswers } from '@/models/schemas/InterviewSchema'


type Props = {
	label: string
	optionId: string
	onChange: (
		optionId: string,
		selectedOption: string,
		checkedOption: string,
		debut: string,
		selectedAmont: string
	) => void
	answers: OptionAnswers[]
}

const R_R_R_R_C_T: React.FC<Props> = ({ label, optionId, onChange, answers }) => {
	const selectedOptionInitValue = () => {
		if (
			answers.find((answer: any) => answer.optionId === optionId)?.selectedOption ===
			'yes'
		) {
			return 'yes'
		} else return 'no'
	}
	const [selectedOption, setSelectedOption] = useState<string>(selectedOptionInitValue())
	const [selectedAmont, setSelectedAmount] = useState<string>(
		answers.find((answer: OptionAnswers) => answer.optionId === optionId)
			?.selectedAmont ?? '',
	)
	const [lastMonth, setLastMonth] = useState<string | null>(
		answers.find((answer: OptionAnswers) => answer.optionId === optionId)
			?.checkedOption ?? '',
	)
	const [debut, setDebut] = useState<string>(
		answers.find((answer: OptionAnswers) => answer.optionId === optionId)?.debut ?? '',
	)

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value)

		if (event.target.value === 'no') {
			setSelectedAmount('')
			setDebut('')
			setLastMonth('')
		}
	}

	const handleSelectedAmuntChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedAmount(event.target.value)
	}
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDebut(event.target.value)
	}

	useEffect(() => {
		onChange(
			optionId,
			selectedOption || '',
			lastMonth || '',
			debut,
			selectedAmont || '',
		)
	}, [optionId, selectedOption, lastMonth, debut, selectedAmont])

	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='capitalize'>{label}</div>
				<div className='grid grid-cols-6'>
					<input
						type='radio'
						value={'no'}
						className='w-20'
						checked={selectedOption === 'no'}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						value={'yes'}
						className='w-20'
						checked={selectedOption === 'yes'}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						value={'1'}
						className='w-20'
						checked={selectedAmont === '1'}
						onChange={handleSelectedAmuntChange}
						disabled={selectedOption === 'no' || selectedOption === null}
					/>
					<input
						type='radio'
						value={'2+'}
						className='w-20'
						checked={selectedAmont === '2+'}
						onChange={handleSelectedAmuntChange}
						disabled={selectedOption === 'no' || selectedOption === null}
					/>
					<input
						type='checkbox'
						className='w-20'
						disabled={selectedOption === 'no' || selectedOption === null}
						checked={lastMonth === 'past_month'}
						onChange={() => {
							setLastMonth((prevValue) =>
								prevValue === 'past_month' ? null : 'past_month',
							)
						}}
					/>
					<input
						type='text'
						className='border h-6 p-2 rounded w-20'
						value={debut}
						onChange={handleInputChange}
						disabled={selectedOption === 'no' || selectedOption === null}
					/>
				</div>
			</div>
		</>
	)
}

export default R_R_R_R_C_T
