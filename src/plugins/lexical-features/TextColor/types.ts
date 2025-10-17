import { LexicalNode, SerializedTextNode, Spread } from 'lexical'

export type TextColorFields = {
  color: 'DEFAULT' | 'PRIMARY' | 'SECONDARY' | 'LIGHT'
}

export type SerializedTextColorNode = Spread<
  {
    fields: TextColorFields
    type: 'textColor'
  },
  SerializedTextNode
>

export type TextColorPayload = {
  fields: TextColorFields
  selectedNodes?: LexicalNode[]
  text: null | string
}
