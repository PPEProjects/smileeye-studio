import * as dotenv from 'dotenv'
dotenv.config({})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import eslint from 'vite-plugin-eslint'
import removeConsole from 'vite-plugin-remove-console'

// @ts-ignore
import GrapHQLGenerator from './src/plugins/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false
  },
  build: {
    chunkSizeWarningLimit: 10000
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@store': path.resolve(__dirname, './src/store'),
      '#types': path.resolve(__dirname, './src/types'),
      '#schema': path.resolve(__dirname, './__generated__'),
      '#apollo': path.resolve(__dirname, './src/apollo'),
      '#notify': path.resolve(__dirname, './src/apollo/notify'),
      '#smileeye': path.resolve(__dirname, './src/apollo/smileeye'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@composables': path.resolve(__dirname, './src/composables')
    }
  },
  preview: {
    port: 3111
  },
  // Tự động sinh ra interface khi thay đổi query
  // Graphql của nam đang bị lỗi query cần fix
  // npx apollo client:download-schema --endpoint=https://v2-be.smileeye.edu.vn/graphql schema.graphqls
  // Lỗi
  plugins: [
    vue(),
    GrapHQLGenerator(),
    eslint({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true
    }),
    process.env.NODE_ENV === 'production' ? removeConsole() : undefined
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/bunny': {
        // @ts-ignore
        target: 'https://sg.storage.bunnycdn.com/smileeyev2/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/bunny/, '')
      },
      '/smileeye': {
        // @ts-ignore
        target: 'https://v2-be.smileeye.edu.vn/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/smileeye/, '')
      }
    }
  }
})
