'use client'
import { useEffect } from 'react'

export const RenderScript = ({ script }: { script: string }) => {
  useEffect(() => {
    if (!script) return

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = script
    const scriptTags = tempDiv.querySelectorAll('script')

    const addedScripts: HTMLScriptElement[] = []

    scriptTags.forEach((scriptTag) => {
      const newScript = document.createElement('script')

      Array.from(scriptTag.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value)
      })

      if (!newScript.src) {
        newScript.textContent = scriptTag.innerHTML
      }

      document.head.appendChild(newScript)
      addedScripts.push(newScript)
    })

    return () => {
      addedScripts.forEach((s) => {
        document.head.removeChild(s)
      })
    }
  }, [script])

  return null
}
