import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repository path as base only in production (GitHub Pages)
  // Use root path in development for simpler URLs
  base: process.env.NODE_ENV === 'production' ? '/fmgs-registration-doc-gov/' : '/',
})
