import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import eslint from 'vite-plugin-eslint'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import tsconfigPaths from 'vite-tsconfig-paths'

// @ts-ignore
import GrapHQLGenerator from './src/plugins/vite'

// auto import component
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

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
    Components({
      dirs: [],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ]
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: path.resolve(__dirname, './**/langs/**')
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    tsconfigPaths()
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#3b66f5',
          'surface-lighter': '#f6f7fc',
          'table-header-bg': '#fff',
          'table-header-color': 'rgba(18,18,23,.6)',
          'table-selected-row-bg': '#fff',
          'font-family':
            '"Avenir Next", Roboto, "Segoe UI", "Open Sans", "Helvetica Neue", "PingFang SC", "Songti SC", "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif'
        },
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
