'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { NextPage } from 'next'
import { readOne } from '@/services/dynamoDb/interviews'
import { readOneForm } from '@/services/dynamoDb/forms'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewAnswer, InterviewSchema } from '@/models/schemas/InterviewSchema'
import { FormSchema } from '@/models/schemas/FormSchema'
import QuestionsMenu from '@/components/QuestionsMenu'
import QuestionInfoHead from '@/components/QuestionInfoHead'
import FormComponents from '@/components/forms'
import FormSkeleton from '@/components/FormSkeleton'
import { readOneAnswer } from '@/services/dynamoDb/answers'

const Question: NextPage = () => {
	const params = useParams()
	const { id, questionId } = params
	const [interview, setInterview] = useState<InterviewSchema | null>(null)
	const [form, setForm] = useState<FormSchema | null>(null)
	const [answer, setAnswer] = useState<InterviewAnswer | null>(null)
	const [question, setQuestion] = useState<QuestionSchema | null>(null)

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await readOneAnswer(id as string, questionId as string)
				setAnswer(data as any)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [id, questionId])


	useEffect(() => {
		const fetchForm = async () => {
			try {
				if (interview) {
					const res = await readOneForm(interview.formType as string)
					setForm(res.form as FormSchema)

					const formQuestion = res.form?.questions.find(
						(q: { id: number }) => q.id === parseInt(questionId as string),
					)
					setQuestion(formQuestion as QuestionSchema)
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchForm()
	}, [interview])

	const [componentName, setComponentName] = useState<string>('')

	useEffect(() => {
		try {
			const formComponent = question?.formType
			setComponentName(formComponent ?? '')
		} catch (err) {
			console.log('error when setting form component:' + err)
		}
	}, [question])

	const FormComponent = FormComponents[componentName] ?? (() => null)

	return (
		<>  
			<div className='container'>
				<div className='shadow-md rounded p-4 my-4'>
					{question !== null ? (
						<>
							<QuestionsMenu 
								questions={form?.questions as QuestionSchema[]}
							 />
							<QuestionInfoHead
								question={question as QuestionSchema}
								answer={answer as InterviewAnswer}
							/>
							<FormComponent
								question={question as QuestionSchema}
								interview={interview as InterviewSchema}
								answer={answer as InterviewAnswer}
							/>
						</>
					) : (
						<>
							<FormSkeleton />
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default Question
