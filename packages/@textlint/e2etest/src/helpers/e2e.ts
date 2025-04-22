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
<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
// setup methods
import { setE2EExpect, } from './core/e2e-expect-runner';
import { initializeFixtureBaseDir, } from './utils/e2e-fixture-paths';

=======
// setup methods
import { setE2EExpect } from './core/e2e-expect-runner';
import { initializeFixtureBaseDir } from './utils/e2e-fixture-paths';

>>>>>>> 61113ec (chore: format by dprint)
// helpers (utils)
<<<<<<< HEAD
import { lintFileHelper } from './utils/e2e-lintfile-helper';
||||||| parent of 61113ec (chore: format by dprint)
import { fixturePaths, } from './utils/e2e-fixture-paths';

import { lintFileHelper, } from './utils/e2e-lintfile-helper';
import { lintMarkdownHelper, } from './utils/e2e-linttmarkdown-helper';
=======
import { fixturePaths } from './utils/e2e-fixture-paths';

import { lintFileHelper } from './utils/e2e-lintfile-helper';
import { lintMarkdownHelper } from './utils/e2e-linttmarkdown-helper';
>>>>>>> 61113ec (chore: format by dprint)

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
export const E2E = {
  lintFile: lintFileHelper,
  lintMarkdown: lintMarkdownHelper,   // markdown文字列ベースの実行系
  //
  factories: e2eFactories,            // E2Eテストケース生成ファクトリ郡
  // lintAst なども追加できる
};

// 個別ユーティリティ
/** lintFileHelper モジュール：parser / linter / validator の統合オブジェクト */
<<<<<<< HEAD
export { lintFileHelper };

/** DI用expectセッター */
export { setE2EExpect } from './core/e2e-expect-runner';
||||||| parent of 61113ec (chore: format by dprint)
export { lintFileHelper, lintMarkdownHelper, };
=======
export { lintFileHelper, lintMarkdownHelper };
>>>>>>> 61113ec (chore: format by dprint)

/**  E2E ユニットテスト用 テストケースファクトリー */
<<<<<<< HEAD
export {
  createE2ELintTestCase,
  createE2EFixtureTestCases,
  createE2ECategorizedFixtureTestCases
} from './testcases/e2e-testcase-factory'

// E2E
export default E2E;
||||||| parent of 61113ec (chore: format by dprint)
export { createE2EFixtureTestCases, createE2ELintTestCase, } from './testcases/e2e-testcase-factory';

=======
export { createE2EFixtureTestCases, createE2ELintTestCase } from './testcases/e2e-testcase-factory';
>>>>>>> 61113ec (chore: format by dprint)
