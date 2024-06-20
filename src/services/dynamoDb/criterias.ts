import { docClient } from '@/dynamodb.config'
import { CriteriaSchema } from '@/models/schemas/CriteriaSchema'
import { GetCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = 'addis_criterias'

const readOneCriterias = async (id: string) => {
    const command = new GetCommand({
       TableName: TABLE_NAME,
       Key: {
          id: id,
       },
    })
 
    try {
       const { Item = {} } = await docClient.send(command)
       return Item as CriteriaSchema
    } catch (error) {
       return null
    }
 }
 
 export { readOneCriterias }