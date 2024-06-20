import { QuestionSchema } from "./QuestionSchema"

export type FormSchema = {
   id: string
   questions: QuestionSchema[]
}
