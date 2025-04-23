// /shared/configs/eslint.config.typed.base.js
//
// @(#) : ESLint flat config for check TypeScript types.
//
// @version   1.0.0
// @since     2025-04-23
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
// ES Lint configs for type check
// <<

// import form common base config
import baseConfig from './eslint.config.base.js';
// rules

import tseslint from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'types/**.*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // type check rules
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      }],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
    },
  },
];
