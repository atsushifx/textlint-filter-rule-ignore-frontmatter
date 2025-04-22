// @(#) : vitest config for textlint filter rule plugin
//
// @version   1.0.0
// @since     2025-04-12
// @author    Furukawa, Atsushi <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Vitest configuration for running unit tests.
// Designed for TypeScript plugin development (textlint).
//
// <<

import { defineConfig, } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/tests/*.{test,spec}.ts',
    ],
  },
},);
