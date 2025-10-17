'use client'

import { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'

export const toolbarhighlightTextGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: 'buttons',
    items,
    key: 'highlightText',
    order: 35,
  }
}
