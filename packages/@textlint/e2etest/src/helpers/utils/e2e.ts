// src: helpers/utils/e2e.ts
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

// ──────────── imports
import { lintText } from './e2e-linttext-helper';

export const E2E = {
  lintText,
  // lintFixture,
  // lintAst,
};
