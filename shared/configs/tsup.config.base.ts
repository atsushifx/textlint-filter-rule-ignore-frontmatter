// @(#) : tsup config
/**
 * @version   1.0.0
 * @author    atsushifx <atsushifx@gmail.com>
 * @since     2025-04-12
 * @license   MIT
 *
 * @description<<
 *
 * Base configuration for tsup bundler, used for building the project with both ESM and CommonJS outputs.
 * Includes setup for sourcemaps, declaration files, and exclusion of test files from bundling.
 *
 * <<
 */

import { dirname } from 'path';
import type { Options } from 'tsup';
import { fileURLToPath } from 'url';

// ✅ __dirname for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export const baseConfig: Options = {
  format: ['esm'],
  target: 'es2022',
  dts: false,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  shims: false,
  outDir: 'dist',

  // ⬇ Sub-repo will define this
  entry: [],
};
