// src: tests/e2e/fixture-runner.test.ts
// @(#) : fixture runner: fixtureパターンのテスト
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
// Released under the MIT License
// https://opensource.org/licenses/MIT

// vitest
import { describe, expect, it } from 'vitest';

// ---- @textlint/e2etest
// types
import { E2EPluginOptionsByExt, E2ETestOptions } from '@/types';

//  libs

// functions
import { createE2ELintTestCase, setE2EExpect } from '@/index';

// -- textlint plugin
import MarkdownProcessor from '@textlint/textlint-plugin-markdown';

// ────────────────────────────────────────────────────────────
// テスト実行メイン
// ────────────────────────────────────────────────────────────

// テスト用定数
const defaultPlugin = {
  Processor: MarkdownProcessor.Processor,
  availableExtensions: () => ['.md'],
};

const defaultOptions: E2ETestOptions = {
  plugin: defaultPlugin,
  pluginOptionsByExt: {
    '.md': {}, //
  },
  rules: [
    {
      ruleId: 'no-todo',
      rule: require('textlint-rule-no-todo').default, // 必要に応じて差し替え
    },
  ],
};
const createE2ETestOptions = (): E2ETestOptions => defaultOptions;

function testRunner() {
  // カテゴリごとにテストを実行
  // const caseDir = 'fixtures';
  const caseDirUnit = 'fixtures/markdown-fixtures';
  const caseName = 'todo-in-markdown';
  const options = createE2ETestOptions();

  describe(`fixture ${caseDirUnit}/${caseName} 's test`, () => {
    it('smoke test', async () => {
      expect(true).toBe(true);
    });
  });
}
// ────────────────────────────────────────────────────────────
// Kick off
// ────────────────────────────────────────────────────────────
setE2EExpect(expect);
testRunner();
