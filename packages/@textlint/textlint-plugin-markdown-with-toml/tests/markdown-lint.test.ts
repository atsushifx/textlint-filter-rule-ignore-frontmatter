// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
// Released under the MIT License
// https://opensource.org/licenses/MIT

// vitest
import { describe, expect, it, } from 'vitest';

// ---- @textlint/e2etest
// types
import type { E2ETestOptions, } from '@textlint/e2etest';

//  libs
import path from 'path';

// functions
<<<<<<< HEAD
import { E2E, setE2EExpect } from '@textlint/e2etest';
||||||| parent of 61113ec (chore: format by dprint)
import { createE2ELintTestCase, setE2EExpect } from '@textlint/e2etest';
=======
import { createE2ELintTestCase, setE2EExpect, } from '@textlint/e2etest';
>>>>>>> 61113ec (chore: format by dprint)

// -- textlint plugin
import { MarkdownProcessorWithTOML, } from '@/index';

// ────────────────────────────────────────────────────────────
// テスト実行メイン
// ────────────────────────────────────────────────────────────
function testRunner() {
  // TextlintPluginObject 互換のラッパー
  const plugin = {
    Processor: MarkdownProcessorWithTOML,
    availableExtensions: () => ['.md',],
  };

  // Fixture テスト用オプション
  const options: E2ETestOptions = {
    plugin,
    pluginOptionsByExt: {
      '.md': {}, // TOML front‑matter 用の追加オプションがあればここへ
      '.custom': { extensions: ['.custom',], }, // 拡張子 `.custom` 用
    },
    rules: [
      {
        ruleId: 'no-todo',
        rule: require('textlint-rule-no-todo',).default, // 必要に応じて差し替え
      },
    ],
  };

  // カテゴリごとにテストを実行
  // const caseDir = 'fixtures';
<<<<<<< HEAD
  const caseDir = 'fixtures';
  const testCaseList = E2E.factories.createE2ECategorizedFixtureTestCases(caseDir, options);
  describe(caseDir, () => {
    for (const testCase of testCaseList) {
      it(testCase.suiteTitle, testCase.run)
    }
  });
||||||| parent of 61113ec (chore: format by dprint)
  const caseDirUnit = 'fixtures/markdown-fixtures';
  const caseName = 'todo-in-markdown';

  const testCase = createE2ELintTestCase(caseDirUnit, caseName, options);
  describe(testCase.suiteTitle, () => {
    it(testCase.testLabel, testCase.run);
  });
=======
  const caseDirUnit = 'fixtures/markdown-fixtures';
  const caseName = 'todo-in-markdown';

  const testCase = createE2ELintTestCase(caseDirUnit, caseName, options,);
  describe(testCase.suiteTitle, () => {
    it(testCase.testLabel, testCase.run,);
  },);
>>>>>>> 61113ec (chore: format by dprint)
}
// ────────────────────────────────────────────────────────────
// Kick off
// ────────────────────────────────────────────────────────────
<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
setE2EExpect(expect)
=======
setE2EExpect(expect,);
>>>>>>> 61113ec (chore: format by dprint)
testRunner();
