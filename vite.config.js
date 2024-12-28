import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Meu App PWA',
        short_name: 'MeuApp',
        description: 'Meu aplicativo React com PWA',
        theme_color: '#ffffff',
        // Remova a configuração de ícones
        icons: [],
      },
    }),
  ],
});
