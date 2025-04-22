// src: types/e2e.types.ts
// @(#) : e2e.types.ts
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { TextlintKernel } from '@textlint/kernel';
import type { TextlintPluginCreator, TextlintRuleModule } from '@textlint/types';

/**
 * E2Eテスト用の Textlint ルールエントリ定義
 *
 * 各ルールには一意の ruleId と、実行可能な rule 関数が必要です。
 */
type E2ERuleEntry = {
  /** ルールの識別子（例: "no-todo"） */
  ruleId: string;
  /** 実際の TextlintRule モジュール */
  rule: TextlintRuleModule;
};

/**
 * 拡張子に応じたプラグイン設定マッピング
 *
 * 例: { ".md": {...}, ".custom": {...} }
 */
type E2EPluginOptionsByExt = Record<string, any>;

/**
 * E2Eテスト時に必要となる各種設定を集約した構造体
 *
 * - 使用するルール群
 * - 利用する Textlint プラグイン
 * - 拡張子ごとのプラグイン設定
 * - 任意でカスタム TextlintKernel を指定可能
 *
 * 通常は `plugin` + `rules` の指定のみで動作します。
 */
type E2ETestOptions = {
  /** 適用するルールのリスト */
  rules: E2ERuleEntry[];
  /** 使用する Textlint プラグイン（Markdown 等） */
  plugin: TextlintPluginCreator;
  /** 拡張子ごとの個別プラグイン設定（オプション） */
  pluginOptionsByExt?: E2EPluginOptionsByExt;
  /** 使用する TextlintKernel を上書きする場合（オプション） */
  kernel?: TextlintKernel;
};

/**
 * E2Eテスト用の想定エラーメッセージ構造
 *
 * output.json の内容と一致する形で定義。
 */
type E2EErrorMessage = {
  /** エラーが発生した行番号（1-based） */
  line: number;
  /** エラーメッセージの内容（部分一致でも検証可能） */
  message: string;
};

/**
 * 単一のテストケース（it）として実行される非同期関数型
 *
 * `createE2ELintTestCase` 等で生成されるテスト関数の型。
 * テストフレームワーク（Vitest, Jest）でそのまま `it(...)` に渡せます。
 */
export type E2ETestRunner = () => Promise<void>;

// ───────── export
export type { E2EErrorMessage, E2EPluginOptionsByExt, E2ERuleEntry, E2ETestOptions };
