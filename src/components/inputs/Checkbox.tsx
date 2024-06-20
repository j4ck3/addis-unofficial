import React from 'react'

interface Props {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked)
	}
	return (
		<>
			<div className='grid grid-cols-2 p-3'>
				<label htmlFor='checkbox' className='cursor-pointer select-none'>
					{label}
				</label>
				<div>
					<input
						id='checkbox'
						type='checkbox'
						name='checkbox'
						checked={checked}
						onChange={handleCheckboxChange}
					/>
				</div>
			</div>
		</>
	)
}

export default Checkbox
