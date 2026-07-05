import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/dance-events/', // замени на точное название твоего репозитория на GitHub
})