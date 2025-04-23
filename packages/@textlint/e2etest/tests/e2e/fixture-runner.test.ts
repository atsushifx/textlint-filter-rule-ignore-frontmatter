// src: tests/e2e/fixture-runner.test.ts
// @(#) : fixture runner: fixtureパターンのテスト
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
// Released under the MIT License
// https://opensource.org/licenses/MIT

// TextLint
import MarkdownProcessor from '@textlint/textlint-plugin-markdown';
import noToDoRule from 'textlint-rule-no-todo';
//
// vitest
import { describe, expect, it } from 'vitest';

// E2E Test
import { E2E } from '@/index';

// types
import type { E2ETestOptions } from '@/types';

// ────────────────────────────────────────────────────────────
// テスト実行メイン
// ────────────────────────────────────────────────────────────

// テスト用定数
const _defaultPlugin = {
  Processor: MarkdownProcessor.Processor,
  availableExtensions: () => ['.md'],
};

// テスト用定数
const _defaultOptions: E2ETestOptions = {
  plugin: _defaultPlugin,
  pluginOptionsByExt: {
    '.md': {}, //
  },
  rules: [
    {
      ruleId: 'no-todo',
      rule: noToDoRule,
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createE2ETestOptions = (): E2ETestOptions => _defaultOptions;

const testRunner = (): void => {
  const caseDirUnit = 'fixtures/markdown-fixtures';
  const caseName = 'todo-in-markdown';

  describe(`fixture ${caseDirUnit}/${caseName} 's test`, () => {
    it('smoke test', async () => {
      expect(true).toBe(true);
    });
  });
};

// -----------
// Kick off
// -----------
E2E.setup.initializeFixtureBaseDir(__dirname);
E2E.setup.setE2EExpect(expect);
testRunner();
