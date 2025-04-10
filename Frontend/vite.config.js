import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

// Remove the try-catch block and direct export
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    open: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  css: {
    devSourcemap: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: isProduction ? 'esbuild' : false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      external: ['lottie-web'],
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          three: ['three', 'three-stdlib', '@react-three/fiber', '@react-three/drei'],
          i18n: ['i18next', 'react-i18next'],
          vendor: ['axios', 'framer-motion', 'zustand']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material'
    ],
    exclude: ['lottie-web']
  }
});