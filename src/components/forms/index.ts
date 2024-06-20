import C_T_Form from './C_T_Form'
import Debut_2_Form from './Debut_2_Form'
import Debut_Form from './Debut_Form'
import R_R_2_Form from './R_R_2_Form'
import R_R_C_Texts_Form from './R_R_C_Texts_Form'
import R_R_E_C_Form from './R_R_E_C_Form'
import R_R_Form from './R_R_Form'
import R_R_R_R_Form from './R_R_R_R_Form'
import R_R_Texts_2_Form from './R_R_Texts_2_Form'
import R_Texts_Form from './R_Texts_Form'
import Substances_Form from './Substances_Form'
import S_T_Form from './S_T_Form'
import S_T_T_Form from './S_T_T_Form'
import Texts_Form from './Texts_Form'
import Yes_no_Form from './Yes_no_Form'
import { FC } from 'react'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'

interface Props {
	question: QuestionSchema
	interview: InterviewSchema
	answer: any
}

const mappings: Record<string, FC<Props>> = {
	C_T_Form: C_T_Form,
	Debut_2_Form: Debut_2_Form,
	Debut_Form: Debut_Form,
	R_R_2_Form: R_R_2_Form,
	R_R_C_Texts_Form: R_R_C_Texts_Form,
	R_R_E_C_Form: R_R_E_C_Form,
	R_R_Form: R_R_Form,
	R_R_R_R_Form: R_R_R_R_Form,
	R_R_Texts_2_Form: R_R_Texts_2_Form,
	R_Texts_Form: R_Texts_Form,
	Substances_Form: Substances_Form,
	S_T_Form: S_T_Form,
	S_T_T_Form: S_T_T_Form,
	Texts_Form: Texts_Form,
	Yes_no_Form: Yes_no_Form,
}

export default mappings
