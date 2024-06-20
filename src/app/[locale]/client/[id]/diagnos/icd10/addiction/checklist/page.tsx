'use client'
import ClientInfoHead from '@/components/ClientInfoHead'
import Diagram from '@/components/Diagram'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import { readOne } from '@/services/dynamoDb/interviews'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Checklist: NextPage = () => {
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

	return (
		<>
			<div className='container'>
				<ClientInfoHead
					interview={interview as InterviewSchema}
					title={'Diagnos Checklista ICD-10 Beroende'}
					info={
						'Diagnosen beroende kräver minst 3 aktuella symptom utspridda i 3 av de 6 beroendekriterierna.'
					}
				/>
				<Diagram interview={interview as InterviewSchema} criterias={undefined} />
			</div>
		</>
	)
}

export default Checklist
