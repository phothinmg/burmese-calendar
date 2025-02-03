import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "./cdn",
  format: "iife",
  // dts: true,
  bundle: true,
  // sourcemap: true,
  // treeshake: true,
  // splitting: true,
  clean: true,
});
