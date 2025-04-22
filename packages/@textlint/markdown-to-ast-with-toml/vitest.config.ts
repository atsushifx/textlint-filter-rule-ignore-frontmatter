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
import baseConfig from '../../../shared/configs/vitest.config.base';

export default defineConfig({
  ...baseConfig,
},);
