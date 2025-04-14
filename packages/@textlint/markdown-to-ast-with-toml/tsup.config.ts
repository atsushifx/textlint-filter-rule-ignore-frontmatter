// @(#) : tsup config for textlint plugin development
//
// @version   1.0.0
// @since     2025-04-12
// @author    Furukawa, Atsushi <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Configuration for tsup bundler using shared base config:
// - Outputs CommonJS + ESM modules
// - Generates declaration files (.d.ts)
// - Cleans output directory before build
// - Excludes config and test files from bundling
//
// <<

import { defineConfig } from 'tsup';
import { baseConfig } from '../../../tsup.config.base';

export default defineConfig({
  ...baseConfig,
  entry: [
    'src/index.ts',
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/tests/**',
  ],
  tsconfig: './tsconfig.json',
  outDir: 'lib', // or "dist" — 選択に応じて調整
});
