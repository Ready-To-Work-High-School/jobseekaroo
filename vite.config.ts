
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
    // Increase memory limit and optimize for large dependencies
    rollupOptions: {
      external: mode === 'production' ? [] : ['@huggingface/transformers'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          lucide: ['lucide-react'],
          // Separate chunk for ML libraries to avoid memory issues
          ml: mode === 'production' ? ['@huggingface/transformers'] : [],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Increase memory allocation for rollup
      maxParallelFileOps: 2,
    },
    // Enable minification to reduce bundle size for production
    minify: mode === 'production',
    cssCodeSplit: true,
    sourcemap: mode !== 'production', // Only enable sourcemaps in development
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 2000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude heavy ML packages from pre-bundling
    exclude: ['@huggingface/transformers'],
  },
  // Increase memory allocation
  define: {
    global: 'globalThis',
  },
}));
