import type { Options } from "tsup";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ✅ __dirname for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export const baseConfig: Options = {
  format: ["esm"],
  target: "es2022",
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  shims: false,
  outDir: "dist"
};
