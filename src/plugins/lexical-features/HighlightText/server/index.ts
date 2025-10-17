import { createServerFeature } from '@payloadcms/richtext-lexical'

export const HighlightTextServerFeature = createServerFeature({
  feature: {
    ClientFeature: '@/plugins/lexical-features/HighlightText/client#HighlightTextClientFeature',
  },
  key: 'highlightText',
})
