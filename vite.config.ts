import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "muzaLitLibrary",
      fileName: "muza-lit-library",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [],
    }
  },
  server: {
    open: true
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  }
});
