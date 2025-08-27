import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "rectanglezone",
      fileName: "rectanglezone",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "index.js",
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
});
