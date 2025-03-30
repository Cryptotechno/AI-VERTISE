import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'AI VERTISE',
        short_name: 'AI VERTISE',
        description: 'Smart, automated, data-driven growth. Built with AI for brands ready to scale.',
        theme_color: '#4338CA',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    ViteImageOptimizer({
      png: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      webp: {
        lossless: false,
        quality: 80,
      },
      avif: {
        lossless: false,
        quality: 80,
      },
      cache: false,
      logStats: true,
    }),
    viteCompression({
      algorithm: 'gzip',
      filter: /\.(js|css|html|svg)$/i
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|css|html|svg)$/i
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create vendor chunk for node_modules
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            
            if (id.includes('framer-motion')) {
              return 'ui';
            }
            
            // Chart libraries
            if (id.includes('chart') || id.includes('d3')) {
              return 'charts';
            }
            
            // Other dependencies
            return 'deps';
          }
        },
        // Reduce chunk size for dynamic imports
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000
  },
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 5173,
    strictPort: false,
    hmr: false,
    watch: {
      usePolling: false,
    },
    open: true,
    host: true
  },
  preview: {
    port: 5173,
    strictPort: false,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'chart.js', 'react-chartjs-2'],
    exclude: ['@babel/runtime'],
  },
  cacheDir: '.vite-cache',
})
