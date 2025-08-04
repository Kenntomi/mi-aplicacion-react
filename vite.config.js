import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mi-aplicacion-react/',
  plugins: [react()]
});
