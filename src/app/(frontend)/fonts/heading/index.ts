import localFont from 'next/font/local'

export const fontHeading = localFont({
  variable: '--font-sofia-pro',
  src: [
    {
      path: './Sofia-Pro-UltraLight.otf',
      weight: '50',
    },
    {
      path: './Sofia-Pro-ExtraLight.otf',
      weight: '100',
    },
    {
      path: './Sofia-Pro-Light.otf',
      weight: '200',
    },
    {
      path: './Sofia-Pro-Regular.otf',
      weight: '400',
    },
    {
      path: './Sofia-Pro-Medium.otf',
      weight: '500',
    },
    {
      path: './Sofia-Pro-SemiBold.otf',
      weight: '600',
    },
    {
      path: './Sofia-Pro-Bold.otf',
      weight: '700',
    },
    {
      path: './Sofia-Pro-Black.otf',
      weight: '800',
    },
  ],
})
