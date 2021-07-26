import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    proxy: {
      '/napi': {
        target: 'https://m.duitang.com/napi/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/napi/, '')
      },
    }
  }
})
