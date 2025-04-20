// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
// Released under the MIT License
// https://opensource.org/licenses/MIT

// vitest
import { describe, expect, it } from 'vitest';

// ---- @textlint/e2etest
// types
import type { E2ETestOptions } from '@textlint/e2etest';

//  libs
import path from 'path';

// functions
import { E2E, setE2EExpect } from '@textlint/e2etest';

// -- textlint plugin
import { MarkdownProcessorWithTOML } from '@/index';

// ────────────────────────────────────────────────────────────
// テスト実行メイン
// ────────────────────────────────────────────────────────────
function testRunner() {
  // TextlintPluginObject 互換のラッパー
  const plugin = {
    Processor: MarkdownProcessorWithTOML,
    availableExtensions: () => ['.md'],
  };

  // Fixture テスト用オプション
  const options: E2ETestOptions = {
    plugin,
    pluginOptionsByExt: {
      '.md': {}, // TOML front‑matter 用の追加オプションがあればここへ
      '.custom': { extensions: ['.custom'] }, // 拡張子 `.custom` 用
    },
    rules: [
      {
        ruleId: 'no-todo',
        rule: require('textlint-rule-no-todo').default, // 必要に応じて差し替え
      },
    ],
  };

  // カテゴリごとにテストを実行
  // const caseDir = 'fixtures';
  const caseDir = 'fixtures';
  const testCaseList = E2E.factories.createE2ECategorizedFixtureTestCases(caseDir, options);
  describe(caseDir, () => {
    for (const testCase of testCaseList) {
      it(testCase.suiteTitle, testCase.run)
    }
  });
}
// ────────────────────────────────────────────────────────────
// Kick off
// ────────────────────────────────────────────────────────────
testRunner();
