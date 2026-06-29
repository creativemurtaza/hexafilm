import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0B0E',
        graphite: '#15171C',
        steel: '#232730',
        ember: '#F5933D',
        'ember-dark': '#E0762A',
        'iris-teal': '#2FD3C0',
        cloud: '#F4F6FA',
        fog: '#AEB6C2',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        btn: '12px',
        card: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
