import { docClient } from '@/dynamodb.config'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = 'addis_substances'

export const readAllSubstances = async () => {
   const command = new ScanCommand({
      TableName: TABLE_NAME,
   })
   try {
      const res = await docClient.send(command)
      return { substances: res.Items }
   } catch (error) {
      return { success: false, data: null }
   }
}