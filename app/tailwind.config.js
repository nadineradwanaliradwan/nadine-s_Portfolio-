/** @type {import('tailwindcss').Config} */
export default {
  // hover: styles only apply on devices that can really hover, so taps don't leave sticky states on phones
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#111111',
        card: '#1A1A1A',
        line: '#262626',
        muted: '#888888',
        folder: '#1C1C1E',
        folderEdge: '#2E2E32',
        tag: '#1C1C1C',
        tagLine: '#2A2A2A',
        tagText: '#CCCCCC',
        input: '#333333',
        ghost: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { head: '-0.03em' },
    },
  },
  plugins: [],
};
