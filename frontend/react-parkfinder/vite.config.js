/// <reference types="vitest" />
/// <reference types="vite/client" />



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    //by setting globals to true we won't need to import things like 'it' or 'describe' etc.
    environment: 'jsdom',     
    globals: true,
    css: true,
    setupFiles: './src/tests/setup.js', // assuming the test folder is in the root of our project
  }
})