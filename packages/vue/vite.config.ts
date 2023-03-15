import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.includes('-')
      }
    }
  })],
  build: {
    target: 'es2015',
    minify: true,
    lib: {
      entry: 'src/components/github-corners/index.ts',
      name: 'WC',
      fileName: 'github-corners',
      formats: ['es', 'iife']
    },
  }
})
