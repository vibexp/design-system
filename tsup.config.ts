import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/react/index.ts" },
  outDir: "dist/react",
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
});
