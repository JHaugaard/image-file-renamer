import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    port: 5173,
    open: true, // Auto-open browser on dev server start
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps for debugging
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },

  // Test configuration for Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
  },
})
