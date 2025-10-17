import {
  createCommand,
  EditorConfig,
  LexicalCommand,
  LexicalNode,
  NodeKey,
  TextNode,
} from 'lexical'
import { HighlightTextFields, HighlightTextPayload, SerializedHighlightTextNode } from '../types'

export const HIGHLIGHT_TEXT_COMMAND: LexicalCommand<HighlightTextNode | null> =
  createCommand('HIGHLIGHT_TEXT_COMMAND')

/** @noInheritDoc */
export class HighlightTextNode extends TextNode {
  __fields: HighlightTextFields
  __id: string

  constructor(text: string, fields: HighlightTextFields, key?: NodeKey) {
    super(text, key)
    this.__fields = fields
  }

  static override clone(node: HighlightTextNode): HighlightTextNode {
    return new HighlightTextNode(node.__text, node.__fields, node.__key)
  }

  static override getType(): string {
    return 'highlightText'
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)
    element.style.background = '#E7542C'
    return element
  }

  static override importJSON(serializedNode: SerializedHighlightTextNode): HighlightTextNode {
    const newNode = $createHighlightTextNode(serializedNode.text, {
      highlightType: serializedNode.fields.highlightType,
    })
    newNode.setFormat(serializedNode.format)
    newNode.setStyle(serializedNode.style)
    return newNode
  }

  override exportJSON(): SerializedHighlightTextNode {
    return {
      ...super.exportJSON(),
      fields: this.getData(),
      type: 'highlightText',
      version: 1,
    }
  }

  getData(): HighlightTextFields {
    return this.getLatest().__fields
  }

  setData(fields: HighlightTextFields) {
    const writable = this.getWritable()
    writable.__fields = fields
  }
}

export function $createHighlightTextNode(text: string, fields: HighlightTextFields) {
  return new HighlightTextNode(text, fields)
}

export function $isHighlightTextNode(
  node: LexicalNode | undefined | null,
): node is HighlightTextNode {
  return node instanceof HighlightTextNode
}
