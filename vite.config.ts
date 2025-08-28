import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "lib",
      outDir: "dist",
      staticImport: true,
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.lib.json",
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    copyPublicDir: true,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "rectangle-zone",
      fileName: "rectangle-zone",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-router-dom": "react-router-dom",
        },
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
});
