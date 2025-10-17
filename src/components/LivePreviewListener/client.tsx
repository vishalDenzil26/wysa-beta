'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const ClientLivePreviewListener: React.FC<{ serverURL: string }> = (props) => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={props.serverURL} />
}
