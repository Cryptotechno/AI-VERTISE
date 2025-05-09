/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700',
              marginTop: '1.5rem',
              marginBottom: '1rem',
            },
            h2: {
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
              listStyleType: 'disc',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#818cf8',
              paddingLeft: '1rem',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 