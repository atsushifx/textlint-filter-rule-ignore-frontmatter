// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { TextlintKernel } from '@textlint/kernel';

type TextlintRuleEntry = {
  ruleId: string;
  rule: any;
};

type TextlintPluginOptionsByExt = Record<string, any>;

type TextlintLintTestOptions = {
  /**
   * 使用する Textlint ルール一覧
   */
  rules: TextlintRuleEntry[];

  /**
   * 使用するプラグイン（Processor を含む）
   */
  plugin: any;

  /**
   * 拡張子ごとのプラグインオプション設定
   */
  pluginOptionsByExt?: TextlintPluginOptionsByExt;

  /**
   * 任意の TextlintKernel を上書き指定（省略時はデフォルト使用）
   */
  kernel?: TextlintKernel;
};

// export
export { TextlintLintTestOptions, TextlintPluginOptionsByExt, TextlintRuleEntry };
