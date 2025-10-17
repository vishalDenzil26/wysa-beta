'use client'

import { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { TextColorIcon } from '../../ui/icons/TextColor'

export const toolbarTextColorGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: 'dropdown',
    ChildComponent: TextColorIcon,
    items,
    key: 'textColor',
    order: 30,
  }
}
