import { OptionAnswers } from '@/models/schemas/InterviewSchema'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
	label: string
	options: any
	optionId: string
	onChange: (optionId: string, selectedId: string, debut: string, age: string) => void
	answers: OptionAnswers[]
}

const S_T_T: React.FC<Props> = ({ label, options, optionId, onChange, answers }) => {
	const [formValues, setFormValues] = useState({
		selectedId:
			answers.find((answer: OptionAnswers) => answer.optionId === optionId)
				?.selectedId ?? '1',
		debut:
			answers.find((answer: OptionAnswers) => answer.optionId === optionId)?.debut ??
			'',
		age:
			answers.find((answer: OptionAnswers) => answer.optionId === optionId)?.age ?? '',
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
			onChange(optionId, formValues.selectedId || '', formValues.debut, formValues.age)
		}

		fetchData()
	}, [optionId, formValues])

	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<div className='capitalize'>{label}</div>
				<div className='grid grid-cols-3 space-x-2'>
					<select
						className='p-2 font-sans rounded'
						name='selectedId'
						value={formValues.selectedId}
						onChange={handleChange}
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
						name='debut'
						value={formValues.debut}
						onChange={handleChange}
					/>
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

export default S_T_T
