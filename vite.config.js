import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import infraVitePlugins from "./shared-kernel/vite-plugins";
import { VitePWA } from 'vite-plugin-pwa'

const ENV_DIR = "./shared-kernel/env";

export default ({ mode = "dev" } = {}) => {
  process.env = { ...process.env, ...loadEnv(mode, ENV_DIR, "") };

  return defineConfig({
    envDir: ENV_DIR,
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate", // updates service worker automatically
        includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
        manifest: {
          name: "Vue Template App",
          short_name: "Vue Template",
          description: "Vue 3 Template Boilerplate",
          theme_color: "#ffffff",
          icons: [
            {
              src: "favicon.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "favicon.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "favicon.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          // Cache JS, CSS, and static assets
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === "script" ||
                request.destination === "style" ||
                request.destination === "worker",
              handler: "CacheFirst",
              options: {
                cacheName: "static-resources",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === "image",
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
          ],
        },
      }),
      infraVitePlugins({
        autoImport: true,
        components: true,
        directives: true,
        svgLoader: {
          componentName: "svg-loader",
          ignore: [],
        },
      }),
    ],
    resolve: {
      alias: {
        "@root": fileURLToPath(new URL(".", import.meta.url)),
        "@cross-cutting": fileURLToPath(
          new URL("./shared-kernel/cross-cutting", import.meta.url)
        ),
        "@user-interface/shared/assets": fileURLToPath(
          new URL("./src/user-interface/shared/assets", import.meta.url)
        ),
        "@user-interface/shared/components": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/components", import.meta.url)
        ),
        "@user-interface/shared/constants": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/constants", import.meta.url)
        ),
        "@user-interface/shared/mappers": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/mappers", import.meta.url)
        ),
        "@user-interface/shared/store": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/store", import.meta.url)
        ),
        "@user-interface/shared/plugins": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/plugins", import.meta.url)
        ),
        "@user-interface/shared/views": fileURLToPath(
          new URL("./shared-kernel/shared/user-interface/views", import.meta.url)
        ),
        "@business-logic/auth": fileURLToPath(
          new URL("./shared-kernel/auth/business-logic", import.meta.url)
        ),
        "@user-interface/auth/store": fileURLToPath(
          new URL("./shared-kernel/auth/user-interface/store", import.meta.url)
        ),
        "@user-interface/auth/constants": fileURLToPath(
          new URL("./shared-kernel/auth/user-interface/constants", import.meta.url)
        ),
        "@user-interface/auth/index.js": fileURLToPath(
          new URL("./shared-kernel/auth/user-interface/index.js", import.meta.url)
        ),

        "@BL/main": fileURLToPath(
          new URL("./src/business-logic/main", import.meta.url)
        ),
        "@BL/apply": fileURLToPath(
          new URL("./src/business-logic/apply", import.meta.url)
        ),
        "@BL/about-us": fileURLToPath(
          new URL("./src/business-logic/about-us", import.meta.url)
        ),
        "@UI/main/store": fileURLToPath(
          new URL("./src/user-interface/main/store", import.meta.url)
        ),
        "@UI/main/constants": fileURLToPath(
          new URL("./src/user-interface/main/constants", import.meta.url)
        ),
        "@UI/item1/constants": fileURLToPath(
          new URL("./src/user-interface/item1/constants", import.meta.url)
        ),
        "@UI/item2/constants": fileURLToPath(
          new URL("./src/user-interface/item2/constants", import.meta.url)
        ),
        "@UI/item3/constants": fileURLToPath(
          new URL("./src/user-interface/item3/constants", import.meta.url)
        ),

        "@BL/apply": fileURLToPath(
          new URL("./src/business-logic/apply", import.meta.url)
        ),
        "@UI/apply/store": fileURLToPath(
          new URL("./src/user-interface/apply/store", import.meta.url)
        ),
        "@UI/apply/constants": fileURLToPath(
          new URL("./src/user-interface/apply/constants", import.meta.url)
        ),

        "@BL/about-us": fileURLToPath(
          new URL("./src/business-logic/about-us", import.meta.url)
        ),
        "@UI/about-us/store": fileURLToPath(
          new URL("./src/user-interface/about-us/store", import.meta.url)
        ),
        "@UI/about-us/constants": fileURLToPath(
          new URL("./src/user-interface/about-us/constants", import.meta.url)
        ),

        "@user-interface": fileURLToPath(
          new URL("./src/user-interface", import.meta.url)
        ),
        "@business-logic/shared": fileURLToPath(
          new URL("./shared-kernel/shared/business-logic", import.meta.url)
        ),
        "@business-logic": fileURLToPath(
          new URL("./src/business-logic", import.meta.url)
        ),
        "@shared-kernel": fileURLToPath(new URL("./shared-kernel", import.meta.url)),
        "@/i18n": fileURLToPath(
          new URL("./src/user-interface/i18n.js", import.meta.url)
        ),
        "@/locales": fileURLToPath(
          new URL("./src/user-interface/shared/locales", import.meta.url)
        ),

        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@shared-kernel/design-system/main.scss";`,
        },
      },
    },
    server: {
      port: process.env.VITE_PORT,
      proxy: {
        "/api/graphql": {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
        "/uploads": {
          target: process.env.VITE_API_BASE_URL,
          secure: false,
          ws: false,
          changeOrigin: true,
        },
      },
    },
  });
};
