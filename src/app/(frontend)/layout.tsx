import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { fontBody } from './fonts/body'
import { fontHeading } from './fonts/heading'
import { ProgressBar } from '@/components/ui/progressbar'
import Script from 'next/script'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { getSecretValue } from '@/utilities/secrets'
import { BlogNav } from '@/BlogNav/Component'
import { GlobalScriptsAndCss } from '@/GobalScriptAndCss/Component'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode()
  return (
    <html
      className={cn(fontBody.variable, fontHeading.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.webp" rel="icon" sizes="32x32" />
        {/* <link href="/favicon.svg" rel="icon" type="image/svg+xml" /> */}

        <Script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"></Script>
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="k0khgDCkStEAnn"
          async
        ></Script>
        <GlobalScriptsAndCss />
      </head>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <main className="relative">
          <Providers>
            <ProgressBar className="fixed top-0 h-1 bg-secondary z-[99]">
              <Header />
              <BlogNav />
              {children}
              <Footer />
            </ProgressBar>
          </Providers>

          {/* <Script
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="b1c2e52d-cedc-47c6-86b3-c0fe401dee3d"
            data-blockingmode="auto"
            type="text/javascript"
            strategy="lazyOnload"
            id="Cookiebot"
          /> */}
        </main>
      </body>
    </html>
  )
}

export const metadata: Metadata = await (async () => {
  const secrets = await getSecretValue()
  return {
    metadataBase: new URL(secrets.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
  }
})()
