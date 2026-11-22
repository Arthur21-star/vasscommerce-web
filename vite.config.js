import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// Tudo que começar com /api é repassado para a API Spring Boot.
// Para o navegador, front e API estão na mesma origem: sem CORS.
const proxyDaApi = {
  '/api': 'http://localhost:8080',
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { proxy: proxyDaApi },
  preview: { proxy: proxyDaApi },
})
