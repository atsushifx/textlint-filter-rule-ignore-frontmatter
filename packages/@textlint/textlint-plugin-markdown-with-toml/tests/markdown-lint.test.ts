// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// type
import type { TextlintLintTestOptions } from '@tests/types/textlint-fixture.types';

// Test Helper
import { runCategorizedLintFixtureTests } from '@tests/helpers/run-lint-fixtures-tests';

// parser
import { MarkdownProcessorWithTOML } from '@/index';

// テスト実行メイン
function testRunner() {
  // Define the plugin wrapper (TextlintPluginObject 互換)
  const plugin = {
    Processor: MarkdownProcessorWithTOML,
    availableExtensions: () => ['.md'], //
  };
  // Define fixture test options
  const options: TextlintLintTestOptions = {
    plugin,
    pluginOptionsByExt: {
      '.md': {}, // TOML frontmatterのオプションがあればここに指定
      '.custom': { // テスト用拡張子 '.custom'用
        extensions: ['.custom'], // ここがキモ！
      },
    },
    rules: [
      {
        ruleId: 'no-todo',
        rule: require('textlint-rule-no-todo').default, // 仮の例、実際のルールに合わせて書き換えてください
      },
    ],
  };

  // Run fixture tests
  const caseDir = 'fixtures';

  runCategorizedLintFixtureTests(caseDir, options);
}

// Run Tests
testRunner();
