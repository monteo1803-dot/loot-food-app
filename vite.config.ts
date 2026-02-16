import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      // Note: vite-plugin-compression requires npm install
      // compression({ algorithm: 'gzip' })
    ],
    build: {
      // Minification with terser for better compression
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Code splitting configuration
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
      // Target modern browsers for smaller bundle
      target: 'esnext',
      // Enable source maps for debugging (disable in production)
      sourcemap: false,
      // Chunk size warning limit
      chunkSizeWarningLimit: 500,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
});
