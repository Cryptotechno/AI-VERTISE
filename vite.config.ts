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
      includeAssets: ['favicon.svg', 'logo.png', 'fav.png', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'AI Vertise',
        short_name: 'AI Vertise',
        theme_color: '#6B46C1',
        background_color: '#6B46C1',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/fav.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Force new cache version to bust any outdated caches
        cacheId: 'aivertise-v3',
        // Skip waiting makes service worker take over immediately
        skipWaiting: true,
        // Force update of cached assets
        clientsClaim: true,
        // Clean outdated caches
        cleanupOutdatedCaches: true,
        
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache-v3',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache-v3',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache-v3',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources-v3',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          },
          {
            urlPattern: /^https:\/\/ai-vertise\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache-v3',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    ViteImageOptimizer({
      png: {
        quality: 65,
        colors: 256,
      },
      jpg: {
        quality: 65,
        progressive: true,
        optimizeScans: true,
      },
      webp: {
        lossless: false,
        quality: 65,
        nearLossless: true,
        smartSubsample: true,
      },
      avif: {
        lossless: false,
        quality: 60,
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
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
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
