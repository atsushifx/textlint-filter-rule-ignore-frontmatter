// src: tsup.config.ts
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

// system config
import { defineConfig } from 'tsup';

// user config
import { baseConfig } from '../../../shared/configs/tsup.config.base';

export default defineConfig({
  ...baseConfig,
  clean: true,
  format: ['cjs', 'esm'],
  entry: [
    'src/**/*',
    // exclude tests
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/tests/**',
  ],
  dts: {
    entry: 'src/index.ts',
    resolve: true,
  },
  tsconfig: './tsconfig.json',
  outDir: 'lib', // for CJS
});
