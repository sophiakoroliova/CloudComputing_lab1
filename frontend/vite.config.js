import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:8080";
const PORT = parseInt(process.env.VITE_PORT || "3000");

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
});
