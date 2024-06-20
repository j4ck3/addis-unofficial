'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { InterviewAnswer } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdateAnswer } from '@/services/dynamoDb/answers'

interface Props {
	isVisible: boolean
	onClose: () => void
	answer: InterviewAnswer
}

const QuestionComment: NextPage<Props> = ({ isVisible, onClose, answer }) => {
	const params = useParams()
	const { questionId, id } = params

	const commentModal = useRef<HTMLDivElement | null>(null)
	const [comment, setComment] = useState<string>(answer?.comment ?? '')
	const [commentSaved, setCommentSaved] = useState<boolean>(false)

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value)
		setCommentSaved(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				commentModal.current &&
				!commentModal.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		if (isVisible) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isVisible, onClose])

	const handleSaveComment = () => {
		try {
			if (id && questionId) {

				const newAnswer = {
					iid: id,
					qid: questionId,
					comment: comment,
				}

				createOrUpdateAnswer(newAnswer)
				setCommentSaved(true)
			}
		} catch (error) {
			setCommentSaved(false)
			console.log(error)
		}
	}

	if (!isVisible) return null

	return (
		<div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-1'>
			<div
				ref={commentModal}
				className='bg-green-500 w-[600px] p-6 rounded-lg shadow-lg'
			>
				<div className='flex justify-between flex-row mb-4'>
					<h2 className='text-base text-white font-medium'>
						Lägg till en Kommentar
					</h2>
				</div>
				<div>
					<textarea
						placeholder='Kommentar'
						value={comment}
						rows={4}
						autoFocus={isVisible}
						onChange={handleInputChange}
						className='w-full mt-4 p-2 bg-white text-black rounded option-input'
					></textarea>
					<div className='grid grid-cols-2 gap-3 mt-2'>
						<button
							type='button'
							className='rounded-md py-1 bg-white text-red-600 font-bold'
							onClick={onClose}
						>
							Avbryt
						</button>
						<button
							type='button'
							className={`rounded-md bg-white text-green-600 font-bold`}
							onClick={handleSaveComment}
							disabled={commentSaved}
						>
							{commentSaved ? 'Sparad' : 'Spara'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuestionComment
