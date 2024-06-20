'use server'
import { docClient } from '@/dynamodb.config'
import { GetCommand, PutCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'

const TABLE_NAME = 'addis_interviews'

const createOrUpdate = async (interview: InterviewSchema) => {
	const command = new PutCommand({
		TableName: TABLE_NAME,
		Item: interview,
	})
	try {
		await docClient.send(command)
		return { success: true }
	} catch (error) {
		console.error('Error creating/updating item:', error)
		return { success: false }
	}
}

const readAll = async () => {
	const command = new ScanCommand({
		TableName: TABLE_NAME,
	})
	try {
		const res = await docClient.send(command)
		return { success: true, interviews: res.Items }
	} catch (error) {
		return { success: false, data: null }
	}
}

const readOne = async (id: string) => {
	const command = new GetCommand({
		TableName: TABLE_NAME,
		Key: {
			id: id,
		},
	})

	try {
		const { Item = {} } = await docClient.send(command)
		return Item as InterviewSchema
	} catch (error) {
		return null
	}
}

const deleteOne = async (id: string) => {
	const command = new DeleteCommand({
		TableName: TABLE_NAME,
		Key: {
			id: id,
		},
	})
	try {
		await docClient.send(command)
		return { success: true }
	} catch (error) {
		return { success: false }
	}
}

// const isUniqueUno = async (uno: string) => {
//    const command = new GetCommand({
//       TableName: TABLE_NAME,
//       Key: {
//          uno: { S: uno },
//       },
//    })

//    try {
//       const { Item = {} } = await docClient.send(command)

//       console.log('Retrieved Item:', Item)

//       if (Item.id !== undefined && Item.id !== null) {
//          console.log('Duplicate uno found:', uno)
//          return false
//       }

//       console.log('Uno is unique:', uno)
//       return true
//    } catch (error) {
//       console.error('Error checking uniqueness of uno:', error)
//       return false
//    }
// }

export { createOrUpdate, readAll, readOne, deleteOne }
