import ClientInfoHead from '@/components/ClientInfoHead'
import Diagram from '@/components/Diagram'
import { CriteriaSchema } from '@/models/schemas/CriteriaSchema'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { readOneInterviewAnswers } from '@/services/dynamoDb/answers'
import { readOneCriterias } from '@/services/dynamoDb/criterias'
import { readOne } from '@/services/dynamoDb/interviews'
import React from 'react'

type Props = {
	params: {
		id: string
	}
}

const HarmfuluseDiagram = async ({ params: { id } }: Props) => {
	const interview = await readOne(id)
	const criterais = await readOneCriterias('ICD-10_harmful_use')
	const answers = await readOneInterviewAnswers(id)

	const criteriaList = criterais?.criterias.find((criteria: any) => criteria.id === '1')
	const symptoms = criteriaList?.symptoms

	const populateDiagram = (
		answer: InterviewAnswer,
		symptom: any,
		substanceCategories: string[],
	) => {
		const symptomAnswers: { symptomAnswers: any[] } = {
			symptomAnswers: [],
		}

		answer.answers.forEach((answerItem: OptionAnswers) => {
			const isSubstanceCategory = substanceCategories.includes(
				answerItem.optionId as string,
			)

			if (
				(answerItem.selectedOption === 'yes' &&
					(answerItem.checkedOption === 'past_year' ||
						answerItem.checkedOption === 'past_month' ||
						answerItem.selectedAmont === '2+')) ||
				(answerItem.selectedOption === 'yes' &&
					answerItem.checkedOption === 'past_year')
			) {
				const code = isSubstanceCategory ? 'A' : 'A1'
				symptomAnswers.symptomAnswers.push({ code, option: answerItem.optionId })
			} else if (
				answerItem.selectedOption === 'yes' &&
				answerItem.checkedOption === ''
			) {
				symptomAnswers.symptomAnswers.push({ code: 'L', option: answerItem.optionId })
			} else if (
				answerItem.selectedOption === 'no' ||
				answerItem.selectedOption === ''
			) {
				symptomAnswers.symptomAnswers.push({ code: '', option: answerItem.optionId })
			}
		})

		// Add empty answers for categories without any responses
		substanceCategories.forEach((category) => {
			const exists = symptomAnswers.symptomAnswers.some(
				(answer) => answer.option === category,
			)
			if (!exists) {
				symptomAnswers.symptomAnswers.push({ code: '', option: category })
			}
		})

		if (symptom) {
			symptom.answers = symptomAnswers
		} else {
			console.error('harmfuluse: symptom not found')
		}
	}

	const answersToCheck = [
		'30',
		'38',
		'54',
		'55',
		'56',
		'57',
		'58',
		'59',
		'60',
		'61',
		'62',
		'63',
		'64',
		'65',
		'66',
		'67',
		'68',
		'69',
		'70',
	]

	answersToCheck.forEach((questionId) => {
		const answer = answers?.find((answer: InterviewAnswer) => answer.qid === questionId)
		const symptom = symptoms?.find((symptom: any) => symptom.questionId === questionId)
		if (answer) {
			const substanceCategories = Object.keys(interview?.substances.categories || {})
			populateDiagram(answer, symptom, substanceCategories)
		}
	})

	return (
		<>
			<div className='container'>
				<ClientInfoHead
					interview={interview as InterviewSchema}
					title={'Diagnos Checklista ICD-10 Skadligt bruk'}
					info={
						'Diagnosen skadligt bruk kräver ett eller fler aktuella symptom. Kom ihåg att två A1= A'
					}
				/>
				<Diagram
					interview={interview as InterviewSchema}
					criterias={criterais as CriteriaSchema}
				/>
			</div>
		</>
	)
}

export default HarmfuluseDiagram
