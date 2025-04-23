// @(#) : vitest config for textlint filter rule plugin
//
// @version   1.0.0
// @since     2025-04-12
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Vitest configuration for running E2E Test (CI Test)
// Designed for TypeScript plugin development (textlint).
//
// <<

// libs
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// system config
import { defineConfig } from 'vitest/config';

// user common config
import baseConfig from '../../../shared/configs/vitest.config.base';

// constants
const __dirname = dirname(fileURLToPath(import.meta.url));

// config
export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
