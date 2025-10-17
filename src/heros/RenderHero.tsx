import React from 'react'

import type { Page, Resource } from '@/payload-types'
import { PrimaryHero } from './PrimaryHero'

export const RenderHero: React.FC<{
  hero: Page['hero'] | Resource['hero']
  breadcrumbs?: Page['breadcrumbs'] | Resource['breadcrumbs']
}> = ({ hero, breadcrumbs }) => {
  if (!hero || hero.variant === 'none') return null

  switch (hero.variant) {
    case 'primary':
    default:
      return <PrimaryHero hero={hero} breadcrumbs={breadcrumbs} />
  }
}
