import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        "components/actions/index": fileURLToPath(
          new URL("./src/components/actions/index.ts", import.meta.url),
        ),
        "components/data-display/index": fileURLToPath(
          new URL("./src/components/data-display/index.ts", import.meta.url),
        ),
        "components/feedback/index": fileURLToPath(
          new URL("./src/components/feedback/index.ts", import.meta.url),
        ),
        "components/forms/index": fileURLToPath(
          new URL("./src/components/forms/index.ts", import.meta.url),
        ),
        "components/layout/index": fileURLToPath(
          new URL("./src/components/layout/index.ts", import.meta.url),
        ),
        "components/navigation/index": fileURLToPath(
          new URL("./src/components/navigation/index.ts", import.meta.url),
        ),
        "components/overlays/index": fileURLToPath(
          new URL("./src/components/overlays/index.ts", import.meta.url),
        ),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
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
