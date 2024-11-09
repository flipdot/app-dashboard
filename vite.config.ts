import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "flipdot",
    project: "app-dashboard",
    url: "https://sentry.flipdot.org"
  })],

  build: {
    sourcemap: true
  }
})