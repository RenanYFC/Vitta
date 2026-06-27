import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify('/'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://vitta-backend-mock.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
