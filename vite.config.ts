/// <reference types="vitest/config" />

import path from "node:path"
import { fileURLToPath } from "node:url"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

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
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/components/**/*.test.{ts,tsx}"],
          setupFiles: ["./src/test/setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
