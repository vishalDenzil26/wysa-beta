import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { BlogNav } from '@/payload-types'
import BlogNavClient from './Component.client'

export async function BlogNav() {
  const blogNav = (await getCachedGlobal('blogNav', 1)()) as BlogNav

  return <BlogNavClient categories={blogNav.categories} />
}
