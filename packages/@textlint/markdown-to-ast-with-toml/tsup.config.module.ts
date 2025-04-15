// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { defineConfig } from 'tsup';
import { baseConfig } from '../../../tsup.config.base';

export default defineConfig({
  ...baseConfig,
  entry: [
    'src/**/*',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/tests/**',
  ],

  format: ['esm'],
  target: 'es2022',
  outDir: 'module',
  tsconfig: './tsconfig.json',
});
