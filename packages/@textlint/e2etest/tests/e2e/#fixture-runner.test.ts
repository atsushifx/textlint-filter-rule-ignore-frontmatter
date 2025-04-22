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
import type { E2ETestOptions, } from '@/types';

//  libs

// functions
import { createE2ELintTestCase, E2E } from '@/index';

// -- textlint plugin

// textlint plugin + rule
import MarkdownPlugin from '@textlint/textlint-plugin-markdown';
import noToDo from 'textlint-rule-no-todo';

// ────────────────────────────────────────────────────────────
// テスト実行メイン
// ────────────────────────────────────────────────────────────

// テスト用定数
const defaultPlugin = {
  Processor: MarkdownPlugin.Processor,
  availableExtensions: () => ['.md',],
};

const defaultOptions: E2ETestOptions = {
  plugin: defaultPlugin,
  pluginOptionsByExt: {
    '.md': {}, //
  },
  rules: [
    {
      ruleId: 'no-todo',
      rule: noToDo,
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
    const testCase = createE2ELintTestCase(caseDirUnit, caseName, options);
    it(testCase.suiteTitle, () => {
      testCase.run();
    });
  });
}
// ────────────────────────────────────────────────────────────
// Kick off
// ────────────────────────────────────────────────────────────
E2E.setup.setE2EExpect(expect);
E2E.setup.initializeFixtureBaseDir(__dirname);
testRunner();
