export type SubstanceCategory = {
	id: string
	injected: boolean
}

export type SubstanceCategories = {
	[key: string]: SubstanceCategory[]
}

type Substances = {
	answer: string
	categories: SubstanceCategories
	dominatingSubstances: string
	favoriteSubstanceMix: string
	otherSubstances: string
	questionId: string
	usedOtherSubstances: string
}

export type Answer = {
	questionId: string
	howMany: string
	ages: string
	optionId?: number
	answer?: string
	comment?: string
	answers: OptionAnswers
	lastTime?: string
}

export type OptionAnswers = {
	optionId: number | string
	checkedOption?: string
	debut?: string
	checkbox?: boolean
	value?: string
	selectedOption?: string
	selectedAmont?: string
	selectedId?: string
	age?: string
}

export type InterviewAnswer = {
	lastTime: any
	qid: string
	iid: string
	answer: Answer
	optionId: number
	comment: string
	debut: string
	checkbox?: boolean
	optionMonth?: string
	optionYear?: string
	howMany?: string
	ages?: string
	quantity?: string
	checked: boolean
	halfYear?: string
	month?: string
	overAYear?: string
	week?: string
	year?: string
	otherStay?: string
	answers: OptionAnswers[]
}

type ContactInfo = {
	name: string
	phone: string
	address: string
	zip: string
	city: string
}

export interface InterviewSchema {
	id: string
	uno: string
	age: string
	gender: string
	interviewer: string
	formType: string
	status: string
	created: string
	answers: InterviewAnswer[]
	contactInfo: ContactInfo
	substances: Substances
}
