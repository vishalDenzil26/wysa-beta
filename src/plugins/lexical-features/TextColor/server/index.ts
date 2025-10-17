import { createServerFeature } from '@payloadcms/richtext-lexical'

export const TextColorServerFeature = createServerFeature({
  feature: {
    ClientFeature: '@/plugins/lexical-features/TextColor/client#TextColorClientFeature',
  },
  key: 'textColor',
})
