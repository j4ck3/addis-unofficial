'use client'
import React, { ChangeEvent, useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'
import { InterviewSchema, InterviewAnswer } from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { createOrUpdate } from '@/services/dynamoDb/interviews'
import Link from 'next/link'

type Props = {
	interview: InterviewSchema
	answers: InterviewAnswer[]
	html: any
}
const Background: React.FC<Props> = ({ interview, answers, html }) => {
	const params = useParams()
	const { id } = params
	const [interviewItem, setInterviewItem] = useState<InterviewSchema | null>(interview)
	const [interviewAnswer, setInterviewAnswers] = useState<any | null>(answers)
	const [formIsSaved, setFormIsSaved] = useState<boolean>(false)
	const [formData, setFormData] = useState<any | null>({
		name: interview.contactInfo.name || '',
		phone: interview.contactInfo.phone || '',
		address: interview.contactInfo.address || '',
		zip: interview.contactInfo.zip || '',
		city: interview.contactInfo.city || '',
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormIsSaved(false)
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSaveComment = () => {
		try {
			const updatedInterview = { ...interview }
			if (interview) {
				updatedInterview.contactInfo = formData
				createOrUpdate(updatedInterview as InterviewSchema)
				setFormIsSaved(true)
			}
		} catch (error) {
			setFormIsSaved(false)
			console.log(error)
		}
	}

	return (
		<>
			<div className='container'>
				<div className='flex justify-end mb-2'>
					<button className='border rounded-md text-black text-sm p-2 inline-flex items-center bg-green-300 hover:bg-green-400 no-underline'>
						<i className='bi bi-arrow-clockwise mx-2'></i>Generera Text
					</button>
				</div>
				<div>
					<RichTextEditor html={html} />
				</div>
				<div className='grid grid-cols-2 gap-3 my-5'>
					<div>
						<p className='mt-3 p-3 bg-cyan-950 rounded text-cyan-500 text-sm'>
							<i className='bi bi-info-circle-fill me-2'></i>
							Observera att detta formulär endast påverkar utskriften och inte
							uppdaterar din användares information permanent.
						</p>
						<div className='mb-4'>
							<label className='text-md'>Namnförtydligande</label>
							<input
								className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className='mb-4'>
							<label className='text-md'>Telefon</label>
							<input
								className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
								type='text'
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</div>
						<div className='mb-4'>
							<label className='text-md'>Adress</label>
							<input
								className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
								type='text'
								name='address'
								value={formData.address}
								onChange={handleInputChange}
							/>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<div className='mb-4'>
								<label className='text-md'>Postnummer</label>
								<input
									className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
									type='text'
									name='zip'
									value={formData.zip}
									onChange={handleInputChange}
								/>
							</div>
							<div className='mb-4'>
								<label className='text-md'>Ort</label>
								<input
									className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
									type='text'
									name='city'
									value={formData.city}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className='flex justify-end'>
							<button
								onClick={handleSaveComment}
								className='border rounded-md text-black text-sm p-2 inline-flex items-center bg-green-300 hover:bg-green-400 no-underline'
							>
								{formIsSaved ? 'Sparat' : 'Spara'}
							</button>
						</div>
					</div>
					<div className='border-l ps-3'>
						<div className='p-0 mb-2'>Kommentarer</div>
						<div>
							{interviewAnswer?.map((answer: InterviewAnswer) => {
								if (answer?.comment) {
									return (
										<div
											className='px-1 pt-1 bg-slate-200 rounded mb-2 p-2'
											key={answer?.qid}
										>
											<Link
												href={`/interview/${id}/question/${answer?.qid}`}
												className='hover:underline no-underline text-green-400'
											>
												Fråga {answer?.qid}:
											</Link>{' '}
											{answer?.comment}
										</div>
									)
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Background
