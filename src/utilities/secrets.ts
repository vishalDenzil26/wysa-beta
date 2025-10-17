import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'

type Secrets = {
  DATABASE_URI: string
  PAYLOAD_PUBLIC_SERVER_URL: string
  NEXT_PUBLIC_SERVER_URL: string
  S3_BUCKET: string
  S3_ACCESS_KEY_ID: string
  S3_SECRET_ACCESS_KEY: string
  S3_REGION: string
  PAYLOAD_PUBLIC_DRAFT_SECRET: string
  NEXT_PRIVATE_DRAFT_SECRET: string
  REVALIDATION_KEY: string
  NEXT_PRIVATE_REVALIDATION_KEY: string
  PAYLOAD_SECRET: string
}

export async function getSecretValue() {
  try {
    const secret_name = process.env.AWS_SECRET_NAME
    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
    const command = new GetSecretValueCommand({ SecretId: secret_name })
    const response = await client.send(command)
    if (!response.SecretString && response.SecretString === '') {
      throw new Error('No secrets found')
    }
    return JSON.parse(response.SecretString ?? '') as Secrets
  } catch (error) {
    console.error('Error retrieving secret:', error)
    throw error
  }
}
