import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const header = (await getCachedGlobal('header', 1)()) as Header

  return <HeaderClient header={header} />
}
