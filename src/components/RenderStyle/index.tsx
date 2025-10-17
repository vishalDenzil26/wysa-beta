'use client'
import { useEffect } from 'react'

export const RenderStyle = ({ style }: { style: string }) => {
  useEffect(() => {
    if (!style) return

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = style
    const styleTag = tempDiv.querySelector('style')

    if (styleTag) {
      const newStyle = document.createElement('style')

      Array.from(styleTag.attributes).forEach((attr) => {
        newStyle.setAttribute(attr.name, attr.value)
      })

      newStyle.textContent = styleTag.innerHTML
      document.head.appendChild(newStyle)

      return () => {
        document.head.removeChild(newStyle)
      }
    }
  }, [style])

  return null
}
