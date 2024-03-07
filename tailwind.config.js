import { Config } from 'tailwindcss'
import * as defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'english-violet': '#56416A',
        rose: '#D1236C',
        'true-blue': '#5998C5',
      },
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
}
export default config
