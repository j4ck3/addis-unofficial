import React, { ChangeEvent } from 'react'

interface RadioProps {
	label: string
	value: number
	selectedOption: number | null
	onOptionChange: (value: number) => void
}

const Radio: React.FC<RadioProps> = ({
	label,
	value,
	selectedOption,
	onOptionChange,
}) => {
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		onOptionChange(parseInt(event.target.value))
	}

	return (
		<div className='grid grid-cols-2 p-3'>
			<label
				className='cursor-pointer capitalize hover:text-slate-400'
				htmlFor={value.toString()}
			>
				{label}
			</label>
			<input
				id={value.toString()}
				type='radio'
				value={value}
				checked={selectedOption === value}
				onChange={handleOptionChange}
			/>
		</div>
	)
}

interface RadioGroupProps {
	options: { id: number; label: string }[]
	selectedOption: number | null
	onOptionChange: (value: number) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({
	options,
	selectedOption,
	onOptionChange,
}) => {
	return (
		<div>
			{options.map((option, index) => (
				<Radio
					key={index}
					label={option.label}
					value={option.id}
					selectedOption={selectedOption}
					onOptionChange={onOptionChange}
				/>
			))}
		</div>
	)
}

export default RadioGroup
