import React, { ChangeEvent } from 'react'

interface Props {
	isSelected: boolean
	onOptionChange: (newSelected: boolean) => void
}

const Yes_No: React.FC<Props> = ({ isSelected, onOptionChange }) => {
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		onOptionChange(event.target.value === 'yes')
	}

	return (
		<>
			<div className='grid grid-cols-2'>
				<label className='inline-flex items-center cursor-pointer'>
					<input
						className='block cursor-pointer'
						type='radio'
						value='no'
						checked={!isSelected}
						onChange={handleOptionChange}
					/>
					<span className='ml-2'>Nej</span>
				</label>
				<label className='inline-flex items-center cursor-pointer'>
					<input
						className='block cursor-pointer'
						type='radio'
						value='yes'
						checked={isSelected}
						onChange={handleOptionChange}
					/>
					<span className='ml-2'>Ja</span>
				</label>
			</div>
		</>
	)
}

export default Yes_No
