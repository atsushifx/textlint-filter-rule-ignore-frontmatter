// vitest.config.base.ts
// @(#) : vitest config for textlint filter rule plugin
//
// @version   1.0.2
// @since     2025-04-12
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Vitest configuration for running unit tests.
// Designed for TypeScript plugin development (textlint).
//
// <<

// vitest
import { defineConfig } from 'vitest/config';

// libs
import { resolve } from 'path';

// configs
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'), // ルートパスとしての "@"
      '@textlinttest': resolve(__dirname, './textlinttest'), // 安全のため明示的に './' を追加
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: [
      // Unit Test (develop test) exec only sub repositories
      // 'src/**/*.test.ts',
      // 'src/**/*.spec.ts',
      // CI Tests exec all  repositories
      'tests/**/*.test.ts',
      'tests/**/*.spec.ts',
    ],
    exclude: [
      'node_modules/**',
      // 出力ディレクトリ
      'dist/**',
      'lib/**',
      'module/**',
      // コメントアウト
      `**/#*.ts`,
    ],
  },
});
