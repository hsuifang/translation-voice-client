import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 9002,
    origin: 'http://0.0.0.0:9002',
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
});
