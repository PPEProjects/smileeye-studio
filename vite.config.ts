import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@components' : path.resolve(__dirname, './src/components'),
      '@layouts' : path.resolve(__dirname, './src/layouts'),
      '@store' : path.resolve(__dirname, './src/store'),
      '#types' : path.resolve(__dirname, './src/types')
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
