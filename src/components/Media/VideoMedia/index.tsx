import React from 'react'

import type { Props as MediaProps } from '../types'
import { ClientVideoMedia } from './component'
import { getSecretValue } from '@/utilities/secrets'

export const VideoMedia: React.FC<MediaProps> = async (props) => {
  const secrets = await getSecretValue()
  return <ClientVideoMedia sever_url={secrets.NEXT_PUBLIC_SERVER_URL} {...props} />
}
