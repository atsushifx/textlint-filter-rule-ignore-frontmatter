<<<<<<< HEAD:packages/@textlint/markdown-to-ast-with-toml/eslint.config.js
// ## @(#) : ESLint flat config for TypeScript workspace
//
// @version   1.0.0
// @since     2025-04-12
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @license   MIT
//
// @description<<
//
// ESLint configuration using Flat Config format (ESLint v8+).
// - Enables recommended rules for both JavaScript and TypeScript
// - Uses @typescript-eslint/parser and plugin for TS support
// - Declares globals like `console`, `process`, `__dirname`
// - Applies config to all `*.ts` files
//
//<<

import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];

||||||| parent of 9c6d80d (chore(config): apply shared monorepo configs and fix tsconfig structure):packages/@textlint/markdown-to-ast-with-toml/eslint.config.js
=======
// eslint.config.js
//
// @(#) : ESLint flat config for TypeScript workspace
//
// @version   1.0.0
// @since     2025-04-12
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
//
//<<

// import form common base config
import baseConfig from "../../../shared/configs/eslint.config.base.js";

export default baseConfig;
>>>>>>> 9c6d80d (chore(config): apply shared monorepo configs and fix tsconfig structure):packages/@textlint/textlint-plugin-markdown-with-toml/eslint.config.js
