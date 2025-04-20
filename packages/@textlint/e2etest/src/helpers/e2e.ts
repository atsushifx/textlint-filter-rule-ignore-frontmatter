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

// --- imports
// helpers (utils)
import { lintFileHelper } from './utils/e2e-lintfile-helper';

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
 * import { E2E } from '@textlint/e2etest';
import { createE2ELintTestCase } from './testcases/e2e-testcase-factory';
 * const result = await E2E.lintFile.lintFile(text, filePath, ext, options);
 */
const E2E = {
  lintFile: lintFileHelper,
  // lintAst,
  e2eFactories
};

// 個別ユーティリティ
/** lintFileHelper モジュール：parser / linter / validator の統合オブジェクト */
export { lintFileHelper };

/** DI用expectセッター */
export { setE2EExpect } from './core/e2e-expect-runner';

/** テストケースを構築するためのユーティリティ関数 */
export { getLintTestCase } from './runners/e2e-runner-fixture';
