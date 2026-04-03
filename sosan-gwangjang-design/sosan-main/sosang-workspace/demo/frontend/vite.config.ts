import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 디자인을 지켜주는 핵심 플러그인입니다!
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // --- 여기에 프록시 설정을 추가했습니다 ---
  server: {
    proxy: {
      '/api-kamis': {
        target: 'https://www.kamis.or.kr',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-kamis/, ''),
      },
    },
  },
})