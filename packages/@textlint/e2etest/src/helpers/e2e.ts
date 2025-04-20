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
import { lintFile } from './utils/e2e-lintfile-helper';
import { lintText } from './utils/e2e-linttext-helper';

// runners
import { runFixtures } from './runners/e2e-runner-fixture';

// --- exports
// 統合オブジェクト
export const E2E = {
  lintText,
  lintFile,
  // lintAst,
  runFixtures,
};

// 個別ユーティリティ
//  (helpers)
export { lintFile, lintText };

//  (runners)
export { runFixtures };

//  (functions)
export {  getLintTestCase, runCategorizedLintFixtureTests } from './runners/e2e-runner-fixture';
