'use server'
import AddictionCurveChart from '@/components/AddictionCurveChart'
import { InterviewAnswer, InterviewSchema } from '@/models/schemas/InterviewSchema'
import { readOneInterviewAnswers } from '@/services/dynamoDb/answers'
import { readOneForm } from '@/services/dynamoDb/forms'
import { readOne } from '@/services/dynamoDb/interviews'
import { readAllSubstances } from '@/services/dynamoDb/substances'
import React from 'react'

type Props = {
	params: {
		id: string
	}
}

const AddictionChart = async ({ params: { id } }: Props) => {
	const interview = await readOne(id as string)
	const answers = await readOneInterviewAnswers(id)
	const formRes = await readOneForm('addis')
	const substances = await readAllSubstances()
	return (
		<>
			<AddictionCurveChart
				interview={interview as InterviewSchema}
				answers={answers as InterviewAnswer[]}
				questions={formRes.data?.questions}
				substances={substances}
			/>
		</>
	)
}

export default AddictionChart
