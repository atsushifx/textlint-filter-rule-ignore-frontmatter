// src: tests/lintMarkdown.test.ts
// @(#) : lintMarkdown関数の動作チェック
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// vitest
import { describe, expect, it } from 'vitest';

// base
import { E2E } from '@/index';

// test module
import { lintMarkdownHelper } from '../e2e-linttmarkdown-helper';

// --- tests
const testRunner = () => {
  describe('markdown parse test', () => {
    it('with input tag: and filename parse all', () => {
      const input = `
        input: markdown.md
        This is ToDo
        `;
      const result = lintMarkdownHelper.parseMarkdownInput(input);

      expect(result.inputPath).toBe('markdown.md');
      expect(result.text).toBe('This is ToDo');
      expect(result.ext).toBe('.md');
    });

    it('no input tag: all main text.', () => {
      const input = `
        This is ToDo
        `;
      const result = lintMarkdownHelper.parseMarkdownInput(input);

      expect(result.inputPath).toBe('<markdown>');
      expect(result.text).toBe('This is ToDo');
      expect(result.ext).toBe('.md');
    });

    //
    it('input tag with no filename:', () => {
      const input = `
        input:
        This is ToDo
        `;
      const result = lintMarkdownHelper.parseMarkdownInput(input);

      expect(result.inputPath).toBe('<markdown>');
      expect(result.text).toBe('This is ToDo');
      expect(result.ext).toBe('.md');
    });
  });

  it('if input is null text', () => {
    const input = ``;
    const result = lintMarkdownHelper.parseMarkdownInput(input);

    expect(result.inputPath).toBe('<markdown>');
    expect(result.text).toBe('');
    expect(result.ext).toBe('.md');
  });
};

// --- Kick Off
E2E.setup.setE2EExpect(expect);
E2E.setup.initializeFixtureBaseDir(__dirname);
testRunner();
