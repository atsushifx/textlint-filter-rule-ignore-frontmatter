// src: tests/lintMarkdown.test.ts
// @(#) : lintMarkdown関数の動作チェック
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// vitest

import { beforeAll, describe, expect, it } from 'vitest';

// DI Container
import { setE2EExpect } from '@/helpers';

// helpers
import { lintMarkdownHelper } from '@/helpers';
import { E2EErrorMessage, E2ETestOptions }from '@/types';
import { lintMarkdownHelper } from '@/helpers';

// --- constants
const inputMarkdown = `
  filename: input.md
  input:
  -  [ ] TODO
`
const outputJson = `
  [
    { "line": 1, "message": "Found TODO" }
  ]
`
describe('linttMarkdown', () => {
  beforeAll(() => {
    setE2EExpect(expect);
  });

  it('markdown parser is correct', () => {
    const parsedInput = lintMarkdownHelper.parseMarkdownInput(inputMarkdown);
    expect(parsedInput.inputPath).toBe('input.md');
    expect(parsedInput.text).toBe('-  [ ] TODO');
    expect(parsedInput.ext).toBe('.md');
  })
});

describe('lintMarkdown - validateMessages', () => {
  it('should pass when actual matches expected messages', () => {
    const actual = [
      { line: 1, message: 'Found TODO item in markdown' },
      { line: 3, message: 'Heading should not end with punctuation.' },
    ];
    const expected = [
      { line: 1, message: 'TODO' },
      { line: 3, message: 'Heading' },
    ];

    // 🔥 expect を含む関数なので、例外が投げられなければ PASS
    expect(() => lintMarkdownHelper.validateMessages(actual, expected)).not.toThrow();
  });

  it('should throw error if line number or message is incorrect', () => {
    const actual = [
      { line: 2, message: 'Some unrelated message' },
    ];
    const expected = [
      { line: 1, message: 'TODO' },
    ];

    // 🔥 不一致なので throw されることを期待
    expect(() => lintMarkdownHelper.validateMessages(actual, expected)).toThrow();
  });
});
