import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": "http://localhost:8080",
            "/uploads": "http://localhost:8080",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) return "vendor-react";
                    if (id.includes("node_modules/lucide-react") || id.includes("node_modules/recharts")) return "vendor-ui";
                    if (id.includes("node_modules/radix-ui")) return "vendor-radix";
                    if (id.includes("node_modules/swr") || id.includes("node_modules/react-helmet-async") || id.includes("node_modules/qrcode.react")) return "vendor-utils";
                },
            },
        },
    },
});
