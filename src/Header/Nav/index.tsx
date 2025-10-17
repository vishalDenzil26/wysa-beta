'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathName = usePathname()
  const [open, setOpen] = useState(false)

  const activePathName = pathName.split('/').length > 1 ? pathName.split('/')[1] : 'home'
  return (
    <>
      <nav className="hidden lg:flex gap-10 items-center">
        {navItems.map(({ link }) => {
          return (
            link && (
              <CMSLink
                key={link.label}
                {...link}
                appearance="link"
                className={cn(
                  'text-sm',
                  activePathName === link?.reference?.value?.['slug']
                    ? 'text-secondary'
                    : 'text-muted-foreground',
                )}
              />
            )
          )
        })}
      </nav>
      <div className="block lg:hidden">
        <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
          <SheetTrigger onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="16" viewBox="0 0 27 16">
              <g id="Group_89" transform="translate(-311.5 -39.5)">
                <line
                  id="Line_10"
                  x2="27"
                  transform="translate(311.5 40.5)"
                  fill="none"
                  stroke="#0b2970"
                  strokeWidth="2"
                />
                <line
                  id="Line_11"
                  x2="22"
                  transform="translate(316.5 47.5)"
                  fill="none"
                  stroke="#0b2970"
                  strokeWidth="2"
                />
                <line
                  id="Line_12"
                  x2="17"
                  transform="translate(321.5 54.5)"
                  fill="none"
                  stroke="#0b2970"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start justify-between">
            <ul className="flex flex-col gap-10 items-start">
              {navItems.map(({ link }) => {
                return (
                  <li key={link?.label}>
                    <CMSLink
                      {...link}
                      onLinkClick={() => setOpen(false)}
                      appearance="link"
                      className={cn(
                        'text-sm',
                        activePathName === link?.reference?.value?.['slug']
                          ? 'text-secondary'
                          : 'text-muted-foreground',
                      )}
                    />
                  </li>
                )
              })}
            </ul>
            {header.link && (
              <div>
                <CMSLink onLinkClick={() => setOpen(false)} {...header.link} className="w-full" />
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
