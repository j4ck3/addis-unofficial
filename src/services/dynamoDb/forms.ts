import { docClient } from '@/dynamodb.config'
import { GetCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = 'addis_forms'

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

const readOneForm = async (id: string) => {
   const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
         id: id,
      },
   })

   try {
      const { Item = {} } = await docClient.send(command)
      return { form: Item }
   } catch (error) {
      return { success: false, data: null, error }
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

export { readAll, readOneForm, deleteOne }
