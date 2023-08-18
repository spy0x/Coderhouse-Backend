import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist/frontend_react",
  },
  server: {
    port: 3000,
  },
});
