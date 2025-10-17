import { LexicalNode } from 'lexical'
import { SerializedTextNode, Spread } from 'lexical'

export type HighlightTextFields = {
  highlightType: 'primary' | 'secondary'
}

export type SerializedHighlightTextNode = Spread<
  {
    fields: HighlightTextFields
    type: 'highlightText'
  },
  SerializedTextNode
>

export type HighlightTextPayload = {
  fields: HighlightTextFields
  selectedNodes?: LexicalNode[]
  text: null | string
}
