// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type TextlintRuleEntry = {
  ruleId: string;
  rule: any;
};

type TextlintPluginOptionsByExt = Record<string, any>;

type TextlintLintTestOptions = {
  rules: TextlintRuleEntry[];
  plugin: any;
  pluginOptionsByExt?: TextlintPluginOptionsByExt;
};

// export
export { TextlintLintTestOptions, TextlintPluginOptionsByExt, TextlintRuleEntry };
