type symptom = {
	questionId: string
	symptom: string
	answers: any
}
type criteria = {
	id: string
	criteria: string
	symptoms: symptom[]
}

export type CriteriaSchema = {
	id: string
	criterias: criteria[]
}

