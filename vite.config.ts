import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// I produktion (bygget som deployas till GitHub Pages) ligger appen under
// /workout/, medan dev-servern kör på roten.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/workout/' : '/',
}))
