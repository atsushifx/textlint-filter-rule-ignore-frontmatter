// src: helpers/e2e.ts
// @(#) : e2e.ts
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// Textlint プラグイン・ルールの E2E テスト支援ユーティリティ統合エントリ。
// カテゴリごとに parser / linter / validator などを lintText に統合。
// 将来 lintFixture / lintAst 等を追加予定。
// <<

// --- imports<
// setup methods
import { setE2EExpect } from './core/e2e-expect-runner';
import { initializeFixtureBaseDir } from './utils/e2e-fixture-paths';

// helpers (utils)
import { fixturePaths } from './utils/e2e-fixture-paths';

import { lintFileHelper } from './utils/e2e-lintfile-helper';
import { lintMarkdownHelper } from './utils/e2e-linttmarkdown-helper';

//  factories
import { e2eFactories } from './testcases/e2e-testcase-factory';

// --- exports
/**
 * E2E テスト支援ユーティリティの統合エントリ。
 *
 * - `lintFile`: input.md/output.json による fixture lint テスト用ユーティリティ群。
 * - `runFixtures`: カテゴリ単位で describe/it を自動展開して実行する runner 群。
 *
 * @example
 * ```ts
 * import { E2E } from '@textlint/e2etest';
 * import { createE2ELintTestCase } from './testcases/e2e-testcase-factory';
 * import { setE2EExpect } from './core/e2e-expect-runner';
 * const result = await E2E.lintFile.lintFile(text, filePath, ext, options);
 * ```
 */
export const E2E = {
  // setup utils
  setup: {
    setE2EExpect,
    initializeFixtureBaseDir,
  },

  // utils
  fixturePaths,

  // test factories
  factories: e2eFactories, // E2Eテストケース生成ファクトリ郡

  // lint Helper
  lintFile: lintFileHelper,
  lintMarkdown: lintMarkdownHelper, // markdown文字列ベースの実行系
  // lintAst なども追加できる
};

// --- 個別ユーティリティ
/** lintFileHelper モジュール：parser / linter / validator の統合オブジェクト */
export { lintFileHelper, lintMarkdownHelper };

/** DI用expectセッター */
export { setE2EExpect } from './core/e2e-expect-runner';

/**  E2E ユニットテスト用 テストケースファクトリー */
export { createE2ELintTestCase } from './testcases/e2e-testcase-factory';
