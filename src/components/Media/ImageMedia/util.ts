import { getPlaiceholder } from 'plaiceholder'

export const getBlurImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))

  const {
    metadata: { width, height },
    ...placeholder
  } = await getPlaiceholder(buffer)

  return { width, height, placeholder }
}
