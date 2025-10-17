import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '@/access/authenticated'

const ResourcesListing: CollectionConfig = {
  slug: 'resourcesListing',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'articleId',
    hidden: true,
  },
  fields: [
    {
      name: 'articleId',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'articleCollectionSlug',
      type: 'text',
      required: true,
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: ['news', 'reports', 'videos'],
      hasMany: false,
      required: true,
    },
  ],
}

export default ResourcesListing
