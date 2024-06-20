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

const AddictionDiagram = async ({ params: { id } }: Props) => {
	const interview = await readOne(id)
	const criterais = await readOneCriterias('DSM5')
	const answers = await readOneInterviewAnswers(id)

	const populateDiagram = (
		answer: InterviewAnswer,
		symptom: any,
		substanceCategories: string[],
	) => {
		const symptomAnswers: { symptomAnswers: any[] } = {
			symptomAnswers: [],
		}
		answer?.answers?.forEach((answerItem: OptionAnswers) => {
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

	criterais?.criterias.forEach((criteria: any) => {
		criteria.symptoms.forEach((symptom: any) => {
			const answer = answers?.find(
				(answer: InterviewAnswer) => answer.qid === symptom.questionId,
			)
			if (answer) {
				const substanceCategories = Object.keys(
					interview?.substances.categories || {},
				)
				populateDiagram(answer, symptom, substanceCategories)
			}
		})
	})

	return (
		<>
			<div className='container'>
				<ClientInfoHead
					interview={interview as InterviewSchema}
					title={'Diagnos Checklista ICD-10 Skadligt bruk'}
					info={'DDD'}
				/>
				<Diagram
					interview={interview as InterviewSchema}
					criterias={criterais as CriteriaSchema}
				/>
			</div>
		</>
	)
}

export default AddictionDiagram
