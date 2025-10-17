import localFont from 'next/font/local'

export const fontBody = localFont({
  variable: '--font-open-sans',
  src: [
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '100',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '200',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '400',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '500',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '600',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '700',
    },
    {
      path: './OpenSans-VariableFont.ttf',
      weight: '800',
    },
  ],
})
