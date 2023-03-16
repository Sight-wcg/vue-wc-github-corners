import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [preact()],
  build: {
    target: 'es2015',
    minify: true,
    lib: {
      entry: 'src/github-corners.tsx',
      name: 'WC',
      fileName: 'github-corners',
      formats: ['es', 'iife'],
    },
  },
});
