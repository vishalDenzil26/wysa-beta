import React from 'react'
import type { Header, Media as MediaType } from '@/payload-types'
import { HeaderNav } from './Nav'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

interface HeaderClientProps {
  header: Header
}

const HeaderLogo: React.FC<{ logo: string | MediaType }> = ({ logo }) => {
  return (
    <Link href={'/'}>
      <Media priority resource={logo} imgClassName="w-20 h-20" />
    </Link>
  )
}
export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  return (
    <header className="sticky inset-0 h-20 bg-background/80 z-50">
      <div className="container relative h-full w-full py-4 flex justify-between items-center">
        <HeaderLogo logo={header.navLogo} />
        <HeaderNav header={header} />
        {header.link && <CMSLink {...header.link} className="hidden lg:flex" />}
      </div>
    </header>
  )
}
