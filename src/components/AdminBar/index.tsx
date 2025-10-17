import type { PayloadAdminBarProps } from 'payload-admin-bar'
import React from 'react'
import { ClientAdminBar } from './client'
import { getSecretValue } from '@/utilities/secrets'

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = async (props) => {
  const secrets = await getSecretValue()
  return <ClientAdminBar server_url={secrets.NEXT_PUBLIC_SERVER_URL} {...props} />
}
