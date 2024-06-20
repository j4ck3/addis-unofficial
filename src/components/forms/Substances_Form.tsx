import React, { ChangeEvent, useEffect, useState } from 'react'
import TwoClickButton from '../TwoClickButton'
import clsx from 'clsx'
import { createOrUpdate } from '@/services/dynamoDb/interviews'
import {
	InterviewSchema,
	SubstanceCategories,
} from '@/models/schemas/InterviewSchema'
import { useParams } from 'next/navigation'
import { readAllSubstances } from '@/services/dynamoDb/substances'

interface FormData {
	dominatingSubstances: string
	favoriteSubstanceMix: string
	otherSubstances: string
}

interface Category {
	substances: Substance[]
	category: string
}

interface DrugData {
	id: string
	drugs: Category[]
}
interface Substance {
	id: string
	name: string
}

interface Props {
	interview: InterviewSchema
}

const Substances_Form: React.FC<Props> = ({ interview }) => {
	const params = useParams()
	const { questionId } = params
	const defaultFormData = {
		dominatingSubstances: interview.substances?.dominatingSubstances || '',
		favoriteSubstanceMix: interview.substances?.favoriteSubstanceMix || '',
		otherSubstances: interview.substances?.otherSubstances || '',
	}
	const [drugs, setDrugs] = useState<DrugData[]>([])
	const [formData, setFormData] = useState<FormData>(defaultFormData)
	const [answers, setAnswers] = useState<SubstanceCategories>(
		interview.substances.categories,
	)
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null>>({
		group1: interview.substances?.answer ?? null,
		group2: interview.substances?.usedOtherSubstances ?? null,
	})

	const handleAnswerChange = (substanceid: string, clickCount: number) => {
		const updatedAnswers: any = { ...answers }

		const category = drugs.reduce((acc: string | null, drugCategory) => {
			const foundSubstance = drugCategory.drugs.find((x) =>
				x.substances.some((s) => s.id === substanceid),
			)
			if (foundSubstance) {
				acc = foundSubstance.category
			}
			return acc
		}, null)

		if (category != null) {
			const existingCategory = updatedAnswers[category]

			const injected = clickCount === 2

			if (clickCount === 0) {
				if (existingCategory) {
					const updatedCategory = existingCategory.filter(
						(answer: any) => answer.id !== substanceid,
					)
					if (updatedCategory.length > 0) {
						updatedAnswers[category] = updatedCategory
					} else {
						delete updatedAnswers[category]
					}
				}
			} else {
				if (existingCategory) {
					const substanceIndex = existingCategory.findIndex(
						(answer: any) => answer.id === substanceid,
					)

					if (substanceIndex !== -1) {
						existingCategory[substanceIndex].injected = injected
					} else {
						updatedAnswers[category] = [
							...existingCategory,
							{ id: substanceid, injected },
						]
					}
				} else {
					updatedAnswers[category] = [{ id: substanceid, injected }]
				}
			}
		}

		setAnswers(updatedAnswers)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await readAllSubstances()
				setDrugs(data.substances as any)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const update = async () => {
			try {
				if (interview && questionId) {
					const updatedInterview = { ...interview }

					updatedInterview.substances = updatedInterview.substances || {}

					updatedInterview.substances = {
						...updatedInterview.substances,
						questionId: questionId as string,
						dominatingSubstances: formData.dominatingSubstances,
						favoriteSubstanceMix: formData.favoriteSubstanceMix,
						otherSubstances: formData.otherSubstances,
						answer: selectedOptions.group1 as string,
						usedOtherSubstances: selectedOptions.group2 as string,
						categories: answers,
					}

					await createOrUpdate(updatedInterview as InterviewSchema)
				}
			} catch (error) {
				console.log(error)
			}
		}

		update()
	}, [interview, questionId, formData, answers, selectedOptions])

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setSelectedOptions((prevOptions) => ({
			...prevOptions,
			[name]: value,
		}))

		if (event.target.name === 'group2' && value === 'no')
			setFormData((prevData) => ({
				...prevData!,
				['otherSubstances']: '',
			}))
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData!,
			[name]: value,
		}))
	}

	return (
		<>
			<div className='space-x-4'>
				<div className='inline'>
					<label className='inline-flex items-center cursor-pointer'>
						<input
							className='block cursor-pointer'
							type='radio'
							name='group1'
							value={'no'}
							checked={selectedOptions.group1 === 'no'}
							onChange={handleOptionChange}
						/>
						<span className='ml-2'>Nej</span>
					</label>
				</div>
				<div className='inline'>
					<label className='inline-flex items-center cursor-pointer'>
						<input
							className='block cursor-pointer'
							type='radio'
							name='group1'
							value={'yes'}
							checked={selectedOptions.group1 === 'yes'}
							onChange={handleOptionChange}
						/>
						<span className='ml-2'>Ja</span>
					</label>
				</div>
			</div>
			<div className='m-2 space-x-3'>
				<span className='text-sm font-bold text-green-500'>
					1 klick (personen har använt substansen)
				</span>
				<span className='text-sm font-bold text-purple-500'>
					2 klick (substansen har även injicerats)
				</span>
			</div>
			<fieldset
				disabled={selectedOptions.group1 === 'no' || selectedOptions.group1 === null}
				className={clsx({
					'opacity-60':
						selectedOptions.group1 === 'no' || selectedOptions.group1 === null,
				})}
			>
				<div className='my-1 p-2 rounded'>
					{drugs.map((categoryGroup: DrugData, groupIndex: number) => (
						<div key={groupIndex}>
							{categoryGroup.drugs.map((item: Category, index: number) => (
								<div key={index}>
									<h2 className='text-lg font-bold capitalize'>
										{item.category}
									</h2>
									<div>
										{item.substances.map((substance: any) => (
											<TwoClickButton
												key={substance.id}
												answers={interview.substances?.categories}
												category={item.category}
												substance={substance}
												onClick={(clickCount) =>
													handleAnswerChange(substance.id, clickCount)
												}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</fieldset>
			<p className='mt-4'>
				Nedanstående texter/svar följer inte med i de frågor som ställs efter
				ämneslistan, utan sammanställs endast i bakgrundstexten
			</p>
			<div className='mb-4'>
				<label className='text-md'>Dominerande preparat</label>
				<input
					className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
					type='text'
					name='dominatingSubstances'
					value={formData?.dominatingSubstances}
					onChange={handleInputChange}
				/>
			</div>
			<div className='my-4'>
				<label className='text-md'>Favoritmix</label>
				<input
					className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full'
					type='text'
					name='favoriteSubstanceMix'
					value={formData?.favoriteSubstanceMix}
					onChange={handleInputChange}
				/>
			</div>
			<div className='my-4'>
				<div className='inline'>
					<p className='m-0 p-0'>
						Har du använt någon/några substanser som inte finns i ämneslistan?
					</p>
					<label className='inline-flex items-center cursor-pointer'>
						<input
							className='block cursor-pointer'
							name='group2'
							type='radio'
							value={'no'}
							checked={selectedOptions.group2 === 'no'}
							onChange={handleOptionChange}
						/>
						<span className='ml-2'>Nej</span>
					</label>
				</div>
				<div className='inline ms-4'>
					<label className='inline-flex items-center cursor-pointer'>
						<input
							className='block cursor-pointer'
							name='group2'
							type='radio'
							value={'yes'}
							checked={selectedOptions.group2 === 'yes'}
							onChange={handleOptionChange}
						/>
						<span className='ml-2'>Ja</span>
					</label>
				</div>
			</div>
			<div className='mb-4'>
				<label className='inline-flex items-center'>Om ja, vilken/vilka?</label>
				<textarea
					disabled={
						selectedOptions.group2 === 'no' || selectedOptions.group2 === null
					}
					className='mt-1 p-2 border border-gray-300 rounded-md w-full'
					value={formData?.otherSubstances}
					name='otherSubstances'
					onChange={handleInputChange}
				></textarea>
			</div>
		</>
	)
}

export default Substances_Form
