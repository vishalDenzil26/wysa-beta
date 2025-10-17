import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Globalscriptsandcss as GlobalscriptsandcssTypes } from '@/payload-types'
import { RenderScript } from '@/components/RenderScript'
import { RenderStyle } from '@/components/RenderStyle'
export async function GlobalScriptsAndCss() {
  const globalScriptsAndCss: GlobalscriptsandcssTypes = await getCachedGlobal(
    'globalscriptsandcss',
    1,
  )()
  const { customCSS, customScripts } = globalScriptsAndCss
  return (
    <>
      <RenderScript script={customScripts!} />
      <RenderStyle style={customCSS!} />
    </>
  )
}
