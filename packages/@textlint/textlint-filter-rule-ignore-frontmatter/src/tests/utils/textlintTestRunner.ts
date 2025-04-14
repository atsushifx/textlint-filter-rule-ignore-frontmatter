// src/tests/utils/testRunner.ts
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { TextlintFilterRuleModule, TextlintRuleReporter } from '@textlint/types';

// textlint modules
import { TextlintKernel } from '@textlint/kernel';
import markdown from '@textlint/textlint-plugin-markdown';

/**
 * Runs textlint with provided rule and filter for given markdown text
 */
const textlintTestRunner = async ({
  text,
  rule,
  filter,
}: {
  text: string;
  rule: { ruleId: string; rule: TextlintRuleReporter };
  filter?: { ruleId: string; rule: TextlintFilterRuleModule };
}) => {
  const kernel = new TextlintKernel();

  return kernel.lintText(text, {
    ext: '.md',
    plugins: [
      {
        pluginId: 'markdown',
        plugin: markdown,
      },
    ],
    rules: [rule],
    filterRules: filter ? [filter] : [],
  });
};

// export
export { textlintTestRunner };
