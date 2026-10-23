import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar describe, it, expect sin importarlos manualmente
    environment: 'jsdom', // Simula el DOM del navegador
    setupFiles: './src/setupTests.js', // Carga matchers como toBeInTheDocument()
  },
});
