import clsx from 'clsx'
import React, { useState } from 'react'

interface Props {
	substance: any
	onClick: (clickCount: number) => void
	answers: any
	category: string
}

const TwoClickButton: React.FC<Props> = ({ substance, onClick, answers, category }) => {
	if(answers == null) return
	
	const matchingObject = answers[category]?.find((obj: any) => obj.id === substance.id)
	const injectedCode =
	matchingObject?.injected === true ? 2 : matchingObject?.injected === false ? 1 : 0
	const [clickCount, setClickCount] = useState(injectedCode)

	const handleClick = () => {
		const newClickCount = (clickCount + 1) % 3
		setClickCount(newClickCount)
		onClick(newClickCount)
	}

	return (
		<button
			onClick={handleClick}
			className={clsx('inline px-2 py-1 m-1 border rounded-md mb-3', {
				'bg-green-500': clickCount === 1,
				'bg-purple-500': clickCount === 2,
			})}
		>
			{substance.name}
		</button>
	)
}

export default TwoClickButton
