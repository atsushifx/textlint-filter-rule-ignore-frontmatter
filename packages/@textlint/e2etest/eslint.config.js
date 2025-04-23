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
// ESLint configuration for markdown-to-ast-with-toml project.
// Extends settings from the shared base ESLint config.
//<<

// libs
import path from 'path';

// plugins
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

// import form common base config
import baseConfig from "../../../shared/configs/eslint.config.base.js";

// settings
export default [
  {
    ignores: [
      'lib/**',
      'module/**',
      'node_modules/**',
    ],
  },

  ...baseConfig,

  // source codes
  {
    files: [
      'src/**/*.ts',
      'types/**/*.ts',
      'test/**/*.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: path.resolve(),
      },
    },
  },
  // setting files
  {
    files: [
      '*.config*.ts',
      '*.config*.js',
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: false, // 型チェックを無効化
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/order': 'warn',
    },
  },
];
