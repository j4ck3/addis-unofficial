require('dotenv').config()
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import creds from './creds'

const dbClient = new DynamoDBClient({
   region: 'eu-north-1',
   credentials: creds
})

export const docClient = DynamoDBDocumentClient.from(dbClient)
