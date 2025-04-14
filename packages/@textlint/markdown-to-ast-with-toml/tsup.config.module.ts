// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { defineConfig } from 'tsup';
import { baseConfig } from '../../../tsup.config.base';

export default defineConfig({
  ...baseConfig,
  format: ['esm'],
  entry: ['src/index.ts'],
  outDir: 'module',
  tsconfig: './tsconfig.json',
});
