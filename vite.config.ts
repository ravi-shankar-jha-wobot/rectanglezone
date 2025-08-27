import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib/**/*.ts", "lib/**/*.tsx"] })],
  css: {
    postcss: undefined,
  },
  build: {
    copyPublicDir: true,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "operational-dashboard",
      fileName: "operational-dashboard",
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
        assetFileNames: "assets/[name][extname]",
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
