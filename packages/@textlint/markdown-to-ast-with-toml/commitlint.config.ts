// @(#) : commitlint configuration for this workspace
/**
 * @version   1.0.0
 * @author    Furukawa, Atsushi <atsushifx@aglabo.com>
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

const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],

  // Output formatter used by commitlint CLI
  formatter: '@commitlint/format',
};

export default Configuration;
