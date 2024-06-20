import { docClient } from '@/dynamodb.config'
import { GetCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = 'addis_background'

export const readOneBackgroundText = async (id: string) => {
	const command = new GetCommand({
		TableName: TABLE_NAME,
		Key: {
			id: id,
		},
	})

	try {
		const { Item = {} } = await docClient.send(command)
		return { success: true, data: Item }
	} catch (error) {
		return { success: false, data: null, error }
	}
}