'use client'

import { ToolbarGroup } from '@payloadcms/richtext-lexical'
import { toolbarhighlightTextGroupWithItems } from './toolbarHighlightTextGroup'
import { HighlightTextIcon } from '../../ui/icons/HighlightText'
import { $getSelection, $isRangeSelection } from 'lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  $createHighlightTextNode,
  $isHighlightTextNode,
  HighlightTextNode,
} from '../nodes/HighlightTextNode'
import { HighlightTextFields } from '../types'

const toolbarGroups: ToolbarGroup[] = [
  toolbarhighlightTextGroupWithItems([
    {
      ChildComponent: HighlightTextIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          for (const node of selection.getNodes()) {
            if ($isHighlightTextNode(node)) {
              return true
            }
            // const parent = node.getParent()
            // if ($isHighlightTextNode(parent)) {
            //   continue
            // }
          }
          return false
        }
        return false
      },
      key: 'highlightText',
      order: 1,
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return

            const selectedText = selection.getTextContent()

            if (!selectedText || !selectedText.length) {
              return
            }

            const highlightTextFields: HighlightTextFields = {
              highlightType: 'secondary',
            }

            const highlightTextNode = $createHighlightTextNode(selectedText, highlightTextFields)

            selection.insertNodes([highlightTextNode])
          })
        }
      },
    },
  ]),
]

export const HighlightTextClientFeature = createClientFeature({
  nodes: [HighlightTextNode],
  toolbarFixed: {
    groups: toolbarGroups,
  },
})
