import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change this to your desired port
    host: "0.0.0.0", // Optionally specify a host, e.g., 'localhost' or '0.0.0.0'
  },
});
