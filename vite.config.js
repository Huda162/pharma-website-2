import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";

import { VitePWA } from "vite-plugin-pwa";

// Add PWA configuration
const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg}"], // Include your asset types
    navigateFallback: "/", // The fallback for client-side routing
    navigateFallbackAllowlist: [/^(?!\/__).*/], // Allowlist for navigateFallback
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/, // Define the regex pattern for your assets
        handler: "StaleWhileRevalidate", // Caching strategy
      },
    ],
  },
  manifest: {
    // name: "Yolo",
    short_name: "Yolo",
    description: "Yolo",
    start_url: "/",
    background_color: "#b58640",
    theme_color: "#b58640",
    icons: [
      {
        src: "/Yolo-2.jpg",
        sizes: "192x192",
        purpose: "any maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  basename: "/",
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
});
