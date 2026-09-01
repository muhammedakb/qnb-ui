import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        /^lucide-react($|\/)/,
        "input-otp",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        banner: '"use client";',
      },
    },
  },
})
