export interface QuestionSchema {
	id: number
	text: string
	categoryId: number
	info?: string
	description?: string
	options?: any
	R_R_options?: any
	textOptions?: any
	substances?: any
	formType?: string
}
