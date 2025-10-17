/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import { SanitizedConfig } from 'payload'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Readonly<Args>): Promise<Metadata> =>
  generatePageMetadata({ config: Promise.resolve(config), params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: Promise.resolve(config), params, searchParams, importMap })

export default Page
