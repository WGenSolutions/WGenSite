/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
        card: 'var(--color-card)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 15px 50px -15px rgba(93, 89, 241, 0.45)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(50% 50% at 50% 50%, rgba(88, 101, 242, 0.35) 0%, rgba(165, 78, 231, 0.1) 45%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

