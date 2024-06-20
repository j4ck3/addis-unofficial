'use client'
import ClientInfoHead from '@/components/ClientInfoHead'
import Substances_Form from '@/components/forms/Substances_Form'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import { readOne } from '@/services/dynamoDb/interviews'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SubstanceList: NextPage = () => {
	const params = useParams()
	const { id } = params
	const [interview, setInterview] = useState<InterviewSchema | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setInterview(await readOne(id as string))
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [id])

	if (!interview) return null

	return (
		<>
			{interview ? (
				<div className='container'>
					<ClientInfoHead
						interview={interview as InterviewSchema}
						title={'Ämneslista'}
						info={'ddd'}
					/>
					<Substances_Form interview={interview as InterviewSchema} />
				</div>
			) : (
				<div>404</div>
			)}
		</>
	)
}
export default SubstanceList
