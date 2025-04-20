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
 * textlint のルール情報（E2E テスト用）
 */
type E2ERuleEntry = {
  ruleId: string;
  rule: TextlintRuleModule;
};

/**
 * 拡張子に対応するプラグインオプションの定義
 */
type E2EPluginOptionsByExt = Record<string, any>;

/**
 * テスト時に与えるオプション構成（ルール＋プラグイン）
 */
type E2ETestOptions = {
  rules: E2ERuleEntry[];
  plugin: TextlintPluginCreator;
  pluginOptionsByExt?: E2EPluginOptionsByExt;
  kernel?: TextlintKernel;
};

/**
 * テスト期待値として使用される、エラーメッセージの構造
 */
type E2EErrorMessage = {
  line: number;
  message: string;
};

// export
export type { E2EErrorMessage, E2EPluginOptionsByExt, E2ERuleEntry, E2ETestOptions };
