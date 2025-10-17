import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateGlobarScriptAndCss: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating globalscriptsandcss`)

  revalidateTag('global_globalscriptsandcss')

  return doc
}
