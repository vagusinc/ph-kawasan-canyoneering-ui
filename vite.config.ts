import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import path from "node:path";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        // `createRoutesFromFolders` will create routes for all files in the
        // routes directory using the same default conventions as Remix v1.
        return createRoutesFromFolders(defineRoutes, {
          // If you're already using `ignoredRouteFiles` in your Remix config,
          // you can move them to `ignoredFilePatterns` in the plugin's options.
          // ignoredFilePatterns: ["**/.*", "**/*.css"],
        });
      },
    }),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~/": path.join(__dirname, "app/"),
      "images/": path.join(__dirname, "app/assets/images/"),
      "icons/": path.join(__dirname, "app/assets/icons/"),
      "videos/": path.join(__dirname, "app/assets/videos/"),
      // "~/shared-components": path.join(__dirname, "app/shared/components"),
      // "~/feature-auth": path.join(__dirname, "app/features/auth"),
    },
  },
});
