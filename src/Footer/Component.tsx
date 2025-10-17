import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import type { Form } from '@payloadcms/plugin-form-builder/types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Facebook } from '@/components/icons/facebook'
import { Instagram } from '@/components/icons/instagram'
import { YouTube } from '@/components/icons/youtube'
import { Twitter } from '@/components/icons/twitter'
import { LinkedIn } from '@/components/icons/linkedin'
import { NewsLetterForm } from './newsletterForm'

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: YouTube,
  linkedin: LinkedIn,
  twitter: Twitter,
}

export async function Footer() {
  const footer = (await getCachedGlobal('footer', 1)()) as Footer

  const { navLogo, navGroups, socialMediaPlatforms, form, misc } = footer

  return (
    <footer className="bg-muted md:py-28 py-6 font-mono">
      <div className="container">
        <Link href={'/'} className="h-max w-32 inline-block">
          <Media resource={navLogo} imgClassName="w-32 h-auto" />
        </Link>
      </div>
      <div className="container py-4 gap-8 grid grid-cols-1 md:grid-cols-[0.7fr_1fr_1fr]">
        <div className="h-full flex flex-col justify-end">
          {socialMediaPlatforms && (
            <div className="flex gap-x-5 text-primary items-center">
              {socialMediaPlatforms.map(({ url, platform, id }) => {
                if (platform in socialIcons) {
                  const Icon = socialIcons[platform]
                  return (
                    <Link href={url} key={id}>
                      <Icon />
                    </Link>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
        {navGroups && (
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-6 md:-mb-4">
            {navGroups.map(({ navItems, groupName, id }) => {
              return (
                <nav key={id} className="space-y-2">
                  <strong className="text-sm text-muted-foreground">{groupName}</strong>
                  <ul className="flex flex-col gap-y-1">
                    {navItems.map(({ link, id }) => {
                      return (
                        <li key={id} className="text-sm text-muted-foreground/80 list-none">
                          <CMSLink {...link} />
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              )
            })}
          </div>
        )}
        <NewsLetterForm form={form as Form} />
      </div>
      <div className="flex flex-col md:flex-row w-full items-center justify-between container gap-5">
        <small className="text-[10px] md:text-sm text-muted-foreground font-thin">
          © Wysa Ltd {new Date().getFullYear()}. All rights reserved
        </small>
        {misc && (
          <nav className="flex gap-x-3 items-center">
            {misc?.termsAndConditions && (
              <span className="text-xs text-muted-foreground list-none">
                <CMSLink {...misc.termsAndConditions.link} />
              </span>
            )}
            <span className="text-primary">|</span>
            {misc.privacyPolicy && (
              <span className="text-xs text-muted-foreground list-none">
                <CMSLink {...misc.privacyPolicy.link} />
              </span>
            )}
          </nav>
        )}
      </div>
    </footer>
  )
}
