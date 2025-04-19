// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { TextlintKernel } from '@textlint/kernel';
import type { TextlintPluginProcessor, TextlintRuleModule } from '@textlint/types';
/**
 * Textlint テストで使用されるルールエントリ
 */
type TextlintTestRuleEntry = {
  ruleId: string;
  rule: TextlintRuleModule;
};

/**
 * Processor を含む Textlint プラグイン型
 */
type TextlintTestPlugin = {
  Processor: TextlintPluginProcessor;
  availableExtensions?: () => string[];
};

/**
 * 拡張子ごとのプラグインオプション
 */
type TextlintTestPluginOptionsByExt = Record<string, any>;

/**
 * テスト時に指定する Textlint オプション構成
 */
type TextlintTestOptions = {
  rules: TextlintTestRuleEntry[];
  plugin: TextlintTestPlugin;
  pluginOptionsByExt?: TextlintTestPluginOptionsByExt;
  kernel?: TextlintKernel;
};

/**
 * テスト期待値として使用される、エラーメッセージ構造
 */
type TextlintTestErrorMessage = {
  line: number;
  message: string;
};

// export
export {
  TextlintTestErrorMessage,
  TextlintTestOptions,
  TextlintTestPlugin,
  TextlintTestPluginOptionsByExt,
  TextlintTestRuleEntry,
};
