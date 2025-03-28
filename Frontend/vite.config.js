// import react from '@vitejs/plugin-react'
// import path from 'path'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
//   build: {
//     outDir: 'dist', // Ensure the build output goes into the 'dist' folder
//     rollupOptions: {
//       output: {
//         // You can customize chunking options here if needed
//         manualChunks: {
//           // Example: separate vendor libraries into a separate chunk
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//         },
//       },
//     },
//   },
// })


//! test
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['lottie-web'], // Add this to handle the three-stdlib warning
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', 'three-stdlib'], // Group Three.js related packages
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lottie-web'], // Add this for development mode
  },
});
