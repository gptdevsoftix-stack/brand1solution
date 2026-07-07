import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react'
          }

          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/lenis')
          ) {
            return 'motion'
          }

          return undefined
        },
      },
    },
  },
})
