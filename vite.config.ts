import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    ignorePatterns: ['public/**', 'src/assets/**', '.agents/**', '.claude/**'],
  },
  lint: {
    plugins: ['oxc', 'typescript', 'unicorn', 'import', 'vue'],
    categories: {
      correctness: 'error',
    },
    rules: {
      'no-console': 'warn',
    },
    env: {
      browser: true,
    },
    ignorePatterns: ['dist/**', 'public/**', '.agents/**', '.claude/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  plugins: lazyPlugins(() => [vue(), tailwindcss()]),
  preview: {
    host: true,
    port: 4173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
