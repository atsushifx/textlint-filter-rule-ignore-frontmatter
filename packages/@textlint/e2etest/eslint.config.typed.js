// src: eslint.config.typed.js
//
// @(#) : ESLint flat config for TypeScript workspace
//
// @version   1.0.0
// @since     2025-04-23
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
// ESLint configuration for check types
//<<

// import form common base config
import baseConfig from "../../../shared/configs/eslint.config.typed.base.js";

// libs
import path from "path";

export default [
  ...baseConfig,
  {
      files: ['**/*.ts', "**/*.tsx"],
      languageOptions: {
        parserOptions: {
          project: [ "./tsconfig.json" ],
          tsconfigRootDir: path.resolve(),  // 実行ディレクトリ基準
        }
      }
  },
];
