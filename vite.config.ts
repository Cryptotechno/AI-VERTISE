import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AI-VERTISE/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true
  }
})
