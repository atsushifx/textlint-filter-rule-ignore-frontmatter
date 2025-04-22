// @(#) : tsup config for textlint plugin development
//
// @version   1.0.0
// @since     2025-04-12
// @author    Furukawa, Atsushi <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Configuration for tsup bundler:
// - Outputs CommonJS + ESM modules
// - Generates declaration files (.d.ts)
// - Cleans dist/ before build
// - Excludes config files from bundling
//
// <<

import { defineConfig, } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/tests/**',
  ],
  format: ['cjs', 'esm',],
  dts: true,
  outDir: 'dist',
  clean: true,
  // for bundle
  minify: true,
  sourcemap: true,
  target: 'es2022',

  // not bundle files
  external: [
    'eslint.config.js',
    'tsconfig.json',
    '**/types/**',
  ],
},);
