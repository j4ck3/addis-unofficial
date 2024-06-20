import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import clsx from 'clsx'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
	label: string
	optionId: number
	onChange: (optionId: number, checkbox: boolean, value: string) => void
	answers: OptionAnswers[]
}

const R_R_C: React.FC<Props> = ({ label, optionId, onChange, answers }) => {
	const selectedOptionInitValule = () => {
		if (answers.find((answer: any) => answer.optionId === optionId)?.value === 'yes') {
			return 'yes'
		} else return 'no'
	}

	const [selectedOption, setSelectedOption] = useState<string>(
		selectedOptionInitValule(),
	)
	const [isChecked, setChecked] = useState<boolean>(
		answers.find((answer: any) => answer.optionId === optionId)?.checkbox === true,
	)

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, type } = event.target

		setSelectedOption(value)

		if (type === 'radio') {
			setSelectedOption(value)
			if (value === 'no') {
				setChecked(false)
			}
		}
	}

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target
		setChecked(checked)
	}

	useEffect(() => {
		const fetchData = async () => {
			onChange(optionId, isChecked, selectedOption)
		}

		fetchData()
	}, [optionId, selectedOption, isChecked])

	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='normal-case'>{label}</div>
				<div className='grid grid-cols-3'>
					<input
						type='radio'
						className='h-6'
						value='no'
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.value === 'no'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='radio'
						className='h-6'
						value='yes'
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.value === 'yes'
						}
						onChange={handleOptionChange}
					/>
					<input
						type='checkbox'
						checked={
							answers.find((answer: any) => answer.optionId === optionId)
								?.checkbox === true
						}
						className={clsx('h-6', {
							'cursor-not-allowed':
								selectedOption === 'no' || selectedOption === null,
						})}
						disabled={selectedOption === 'no' || selectedOption === null}
						onChange={handleCheckboxChange}
					/>
				</div>
			</div>
		</>
	)
}

export default R_R_C
