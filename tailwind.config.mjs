/** @type {import('tailwindcss').Config} */

const generateGridClasses = () => {
  const gridClasses = ['grid-rows-none', 'grid-cols-none']

  const breakpoints = ['', 'sm:', 'md:', 'lg:', 'xl:']
  const maxGridColumns = 20 // Typical max grid columns
  const maxGridRows = 20 // Typical max grid rows

  breakpoints.forEach((breakpoint) => {
    for (let i = 1; i <= maxGridColumns; i++) {
      gridClasses.push(`${breakpoint}grid-cols-${i}`)
      gridClasses.push(`${breakpoint}col-span-${i}`)
      gridClasses.push(`${breakpoint}col-start-${i}`)
      gridClasses.push(`${breakpoint}col-end-${i}`)
    }

    for (let i = 1; i <= maxGridRows; i++) {
      gridClasses.push(`${breakpoint}grid-rows-${i}`)
      gridClasses.push(`${breakpoint}row-span-${i}`)
      gridClasses.push(`${breakpoint}row-start-${i}`)
      gridClasses.push(`${breakpoint}row-end-${i}`)
    }
  })
  return gridClasses
}

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    ...generateGridClasses(),
    'grid-rows-[repeat(11, 300px)]',
    'lg:grid-rows-[300px_300px_300px]',
    'lg:grid-rows-[1fr_0.4fr_0.1fr]',
    'grid-rows-[1fr_1fr_1fr_0.1fr]',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'bg-secondary',
    'max-md:grid-rows-[repeat(3,auto)]',
    'grid-rows-[repeat(3,auto)]',
    'lg:grid-rows-[repeat(2,auto)]',
    'max-md:grid-rows-[repeat(2,auto)]',
    'max-md:gap-x-3',
    'max-md:gap-y-3',
    'min-h-[200px]',
    'max-md:py-5',
    'lg:px-16',
    'grid-rows-[auto_1fr_1fr]',
    'max-lg:gap-x-0',
  ],
  theme: {
    screens: {
      '2xl': '72rem',
      lg: '56rem',
      md: '48rem',
      sm: '40rem',
      xl: '64rem',
    },
    container: {
      center: true,
      // padding: {
      //   '2xl': '0 2rem',
      //   DEFAULT: '0 2rem',
      //   lg: '0 2rem',
      //   md: '0 2rem',
      //   sm: '0 2rem',
      //   xl: '0 6rem',
      // },
      screens: {
        '2xl': '72rem',
        lg: '56rem',
        md: '48rem',
        sm: '40rem',
        xl: '64rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        full: '9999px',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-sofia-pro)'],
        sans: ['var(--font-open-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--foreground)',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              fontFamily: 'var(--font-sofia-pro)',
              lineHeight: 1.2,
              marginBottom: '0.2em',
            },
            h2: {
              fontSize: '2.5rem',
              fontWeight: 500,
              lineHeight: 1.3,
              fontFamily: 'var(--font-sofia-pro)',
            },
            h3: {
              fontSize: '1.8rem',
              fontWeight: 500,
              lineHeight: 1.4,
              fontFamily: 'var(--font-sofia-pro)',
            },
            h4: {
              fontSize: '1.5rem',
              fontWeight: 500,
              lineHeight: 1.4,
              fontFamily: 'var(--font-sofia-pro)',
            },
            h5: {
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: 1.4,
              fontFamily: 'var(--font-sofia-pro)',
            },
            p: {
              fontSize: '15px',
              fontFamily: 'var(--font-open-sans)',
            },
            small: {
              fontSize: '12px',
              fontFamily: 'var(--font-open-sans)',
            },
            button: {
              fontSize: '14px',
              fontFamily: 'var(--font-open-sans)',
            },
            strong: {
              color: 'inherit',
              fontWeight: 'bold',
            },
            blockquote: {
              color: 'inherit',
              fontStyle: 'italic', // Optional
            },
          },
        },
      }),
    },
  },
}
