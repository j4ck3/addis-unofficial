import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
	label: string
	options: any
	optionId: string
	onChange: (optionId: string, selectedId: string, age: string) => void
	answers: OptionAnswers[]
}

const S_T: React.FC<Props> = ({ label, options, optionId, onChange, answers}) => {
	const [formValues, setFormValues] = useState({
		selectedId: answers.find((answer: any) => answer.optionId === optionId)?.selectedId ?? '1',
		age: answers.find((answer: any) => answer.optionId === optionId)?.age ?? '',
	})

	const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = event.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}))
	}

	useEffect(() => {
		const fetchData = async () => {
			onChange(optionId, formValues.selectedId, formValues.age)
		}

		fetchData()
	}, [optionId, formValues])

	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='capitalize'>{label}</div>
				<div className='grid grid-cols-2 space-x-2'>
					<select
						className='p-2 font-sans rounded'
						onChange={handleChange}
						name='selectedId'
						value={formValues.selectedId}
					>
						{options.map((option: any) => (
							<option key={option.id} value={option.id}>
								{option.label}
							</option>
						))}
					</select>
					<input
						className='p-2 h-6 border rounded'
						type='text'
						name='age'
						value={formValues.age}
						onChange={handleChange}
					/>
				</div>
			</div>
		</>
	)
}

export default S_T
