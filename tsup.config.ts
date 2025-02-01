import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "./dist",
  format: "esm",
  dts: true,
  bundle: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  clean: true,
});
