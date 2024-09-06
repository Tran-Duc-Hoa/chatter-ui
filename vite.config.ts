import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/messages': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
});
