import { docClient } from '@/dynamodb.config'
import { InterviewAnswer } from '@/models/schemas/InterviewSchema'
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = 'addis_answers'

const readOneAnswer = async (iid: string, qid: string) => {
	const command = new GetCommand({
		TableName: TABLE_NAME,
		Key: {
			iid: iid,
			qid: qid,
		},
	})

	try {
		const { Item = {} } = await docClient.send(command)
		return { success: true, data: Item }
	} catch (error) {
		return { success: false, data: null, error }
	}
}

const readOneInterviewAnswers = async (iid: string) => {
	const command = new QueryCommand({
		TableName: TABLE_NAME,
		KeyConditions: {
			iid: {
				ComparisonOperator: 'EQ',
				AttributeValueList: [iid],
			},
		},
	})
	try {
		const { Items = [] } = await docClient.send(command)
		return Items as InterviewAnswer[]
	} catch (error) {
		console.error('Error reading interview answers:', error)
		return []
	}
}

const createOrUpdateAnswer = async (answer: any) => {
	const command = new PutCommand({
		TableName: TABLE_NAME,
		Item: answer,
	})
	try {
		await docClient.send(command)
		return { success: true }
	} catch (error) {
		console.error('Error creating/updating item:', error)
		return { success: false }
	}
}

export { readOneAnswer, createOrUpdateAnswer, readOneInterviewAnswers }
