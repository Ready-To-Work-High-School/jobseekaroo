
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    allowedHosts: ['0772863e-2eac-4b3c-b10a-aec607ec1185.lovableproject.com']
  },
  build: {
    outDir: 'dist',
    // Optimize chunks and code-splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          lucide: ['lucide-react'],
        },
        // Reduce chunk size for better performance
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Disable minification temporarily to resolve dynamic import issues
    minify: false,
    // Improve chunking
    cssCodeSplit: true,
    sourcemap: true, // Enable sourcemaps in all environments to help with debugging
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // Explicitly include these dependencies
  }
}));
