import { copyFileSync, mkdirSync } from 'fs'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/**': {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
    },
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    }
  },

  hooks: {
    'build:before': () => {
      mkdirSync('public/ffmpeg', { recursive: true })
      const base = 'node_modules/@ffmpeg/core-mt/dist/esm' // esm instead of umd
      copyFileSync(`${base}/ffmpeg-core.js`, 'public/ffmpeg/ffmpeg-core.js')
      copyFileSync(`${base}/ffmpeg-core.wasm`, 'public/ffmpeg/ffmpeg-core.wasm')
      copyFileSync(`${base}/ffmpeg-core.worker.js`, 'public/ffmpeg/ffmpeg-core.worker.js')
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
