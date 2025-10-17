import { EditorConfig, LexicalNode, NodeKey, TextNode } from 'lexical'
import { SerializedTextColorNode, TextColorFields } from '../types'

/** @noInheritDoc **/
export class TextColorNode extends TextNode {
  __fields: TextColorFields

  constructor(text: string, fields: TextColorFields, key?: NodeKey) {
    super(text, key)
    this.__fields = fields
  }

  static clone(node: TextColorNode): TextColorNode {
    return new TextColorNode(node.__text, node.__fields, node.__key)
  }

  static getType(): string {
    return 'textColor'
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    switch (this.__fields.color) {
      case 'DEFAULT':
        dom.style.color = ''
        break
      case 'PRIMARY':
        dom.style.color = '#0B2970'
        break
      case 'SECONDARY':
        dom.style.color = '#E7542C'
        break
      case 'LIGHT':
        dom.style.color = '#FFFFFF'
        break
      default:
        dom.style.color = ''
        break
    }

    return dom
  }
  static importJSON(serializedNode: SerializedTextColorNode): TextColorNode {
    return $createTextColorNode(serializedNode.text, serializedNode.fields)
  }

  exportJSON(): SerializedTextColorNode {
    return {
      ...super.exportJSON(),
      fields: this.getLatest().__fields,
      type: 'textColor',
      version: 1,
    }
  }
  setData(fields: TextColorFields) {
    const writable = this.getWritable()
    writable.__fields = fields
  }
}

export function $createTextColorNode(text: string, fields: TextColorFields): TextColorNode {
  return new TextColorNode(text, fields)
}

export function $isTextColorNode(node: LexicalNode | undefined | null): node is TextColorNode {
  return node instanceof TextColorNode
}
