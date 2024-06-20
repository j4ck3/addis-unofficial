import React, { ChangeEvent } from 'react'

interface Props {
	label: string
	value: string
	onChange: (value: string) => void
}

const Text: React.FC<Props> = ({ label, value, onChange}) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(event.target.value)
	}

	return (
		<div className='grid grid-cols-2 p-3'>
			<div>{label}</div>
			<div className='flex justify-center'>
				<textarea
					className='border rounded px-1 h-6'
					value={value}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

export default Text