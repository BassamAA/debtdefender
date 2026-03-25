import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f8',
          100: '#d5e0ef',
          200: '#a9c0df',
          300: '#7a9fcf',
          400: '#4e7fbf',
          500: '#2c61a5',
          600: '#1e4a87',
          700: '#163869',
          800: '#102b52',
          900: '#0a1c38',
          950: '#060f20',
        },
        steel: {
          400: '#7bafd4',
          500: '#5b9bbf',
          600: '#4682b4',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
