import React from 'react'
import { ClientLivePreviewListener } from './client'
import { getSecretValue } from '@/utilities/secrets'

export const LivePreviewListener: React.FC = async () => {
  const secrets = await getSecretValue()
  return <ClientLivePreviewListener serverURL={secrets.NEXT_PUBLIC_SERVER_URL} />
}
