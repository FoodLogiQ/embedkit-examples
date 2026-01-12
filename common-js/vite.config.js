    import { defineConfig } from 'vite';

    export default defineConfig({
      optimizeDeps: {
        exclude: ['boomi.config.js'] 
      }
    });