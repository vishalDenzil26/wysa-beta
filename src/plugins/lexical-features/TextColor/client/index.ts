'use client'

import { ToolbarGroup } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { TextColorIcon } from '../../ui/icons/TextColor'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $createTextColorNode, $isTextColorNode, TextColorNode } from '../node/TextColorNode'
import { toolbarTextColorGroupWithItems } from './toolbarTextColorNode'

const toolbarGroup: ToolbarGroup[] = [
  toolbarTextColorGroupWithItems([
    {
      ChildComponent: TextColorIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          for (const node of selection.getNodes()) {
            if ($isTextColorNode(node)) {
              continue
            }
            const parent = node.getParent()
            if ($isTextColorNode(parent)) {
              continue
            }
          }
          return true
        }
        return false
      },
      key: 'textColorDefault',
      label: 'Default',
      order: 1,
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return
            const selectedText = selection.getTextContent()

            if (!selectedText || !selectedText.length) return
            const textColorNode = $createTextColorNode(selectedText, {
              color: 'DEFAULT',
            })
            selection.insertNodes([textColorNode])
          })
        }
      },
    },

    {
      ChildComponent: TextColorIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          for (const node of selection.getNodes()) {
            if ($isTextColorNode(node)) {
              continue
            }
            const parent = node.getParent()
            if ($isTextColorNode(parent)) {
              continue
            }
          }
          return true
        }
        return false
      },
      key: 'textColorPrimary',
      label: 'Primary',
      order: 2,
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return
            const selectedText = selection.getTextContent()

            if (!selectedText || !selectedText.length) return
            const textColorNode = $createTextColorNode(selectedText, {
              color: 'PRIMARY',
            })
            selection.insertNodes([textColorNode])
          })
        }
      },
    },
    {
      ChildComponent: TextColorIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          for (const node of selection.getNodes()) {
            if ($isTextColorNode(node)) {
              continue
            }
            const parent = node.getParent()
            if ($isTextColorNode(parent)) {
              continue
            }
          }
          return true
        }
        return false
      },
      key: 'textColorSecondary',
      label: 'Secondary',
      order: 3,
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return
            const selectedText = selection.getTextContent()

            if (!selectedText || !selectedText.length) return
            const textColorNode = $createTextColorNode(selectedText, {
              color: 'SECONDARY',
            })
            selection.insertNodes([textColorNode])
          })
        }
      },
    },
    {
      ChildComponent: TextColorIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          for (const node of selection.getNodes()) {
            if ($isTextColorNode(node)) {
              continue
            }
            const parent = node.getParent()
            if ($isTextColorNode(parent)) {
              continue
            }
          }
          return true
        }
        return false
      },
      key: 'textColorLight',
      label: 'Light',
      order: 4,
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return
            const selectedText = selection.getTextContent()

            if (!selectedText || !selectedText.length) return
            const textColorNode = $createTextColorNode(selectedText, {
              color: 'LIGHT',
            })
            selection.insertNodes([textColorNode])
          })
        }
      },
    },
  ]),
]

export const TextColorClientFeature = createClientFeature({
  nodes: [TextColorNode],
  toolbarFixed: {
    groups: toolbarGroup,
  },
  toolbarInline: {
    groups: toolbarGroup,
  },
})
