// /shared/configs/eslint.config.base.js
//
// @(#) : ESLint flat config for TypeScript workspace
//
// @version   1.0.0
// @since     2025-04-12
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
// ESLint configuration using Flat Config format (ESLint v8+).
// - Enables recommended rules for both JavaScript and TypeScript
// - Uses @typescript-eslint/parser and plugin for TS support
// - Declares globals like `console`, `process`, `__dirname`
// - Applies config to all `*.ts` files
// <<

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
//
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // JavaScriptの推奨設定を統合
  js.configs.recommended,

  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'types/**.*.ts'],
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
      'import': importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // string ts
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      //
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/no-unresolved': 'error',
      'import/order': ['warn', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
      }],
      // ✅ 通常関数を禁止し、関数式に統一
      'func-style': ['error', 'expression'],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'], // ワークスペース内のtsconfigを指す
        },
      },
    },
  },
];
