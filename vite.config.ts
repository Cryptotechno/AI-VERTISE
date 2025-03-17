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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          charts: ['chart.js', 'react-chartjs-2'],
          icons: ['react-icons']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true
  }
})
