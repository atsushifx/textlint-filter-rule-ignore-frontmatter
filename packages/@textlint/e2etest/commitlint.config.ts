// src: commitlint.config.ts
// @(#) : commitlint configuration for this workspace
/**
 * @version   1.0.0
 * @author    atsushifx <atsushifx@gmail.com>
 * @since     2025-04-12
 * @license   MIT
 *
 * @description<<
 *
 * This file defines commitlint rules for this project.
 * It loads the standard configuration from @commitlint/config-conventional
 * and applies a formatter for CLI output.
 *
 * <<
 */

// type
import type { UserConfig } from '@commitlint/types';

// base Config
import baseConfig from '../../../shared/configs/commitlint.config.base';

// config
const config: UserConfig = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
  },
};

export default config;
