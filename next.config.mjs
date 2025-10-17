import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
// @ts-check
import withPlaiceholder from '@plaiceholder/next'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }

    return [
      {
        source: '/:all*(css|gif|svg|jpg|jpeg|png|woff|woff2|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=114600, immutable',
          },
        ],
      },
    ]
  },
  output: 'standalone', // Only use this if yoy are using Docker for deployment
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(withPlaiceholder(nextConfig))
