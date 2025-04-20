// src: helpers/utils/e2e-linttext-helper.ts
// @(#) : e2e-linttext.ts
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// Textlint プラグイン・ルールの E2E テスト支援用ユーティリティ。
// 構文抽出・lint実行・メッセージ検証を統合し、lintText オブジェクトで提供。
// <<

// ───────────────────── imports
// type
import type { E2EErrorMessage, E2ETestOptions } from '../../types';

// vitest
import { expect } from 'vitest';

import { TextlintKernel } from '@textlint/kernel';

// ───────────────────── parser
function parseMarkdownInput(markdown: string): { filename: string; text: string; ext: string } {
  const filenameMatch = markdown.match(/^filename:\s*(.+)$/m);
  const inputBlockMatch = markdown.match(/```(?:[\w]*)\n([\s\S]*?)```/m);

  expect(filenameMatch && inputBlockMatch).toBeTruthy();

  const filename = filenameMatch?.[1]?.trim() ?? '<markdown>';
  const text = inputBlockMatch?.[1] ?? '';
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : '.md';

  return { filename, text, ext };
}

function parseExpectedJson(jsonText: string): E2EErrorMessage[] {
  return JSON.parse(jsonText);
}

// ───────────────────── linter
async function lintTextFn(
  text: string,
  filename: string,
  ext: string,
  options: E2ETestOptions,
) {
  const kernel = options.kernel ?? new TextlintKernel();
  const pluginOptions = options.pluginOptionsByExt?.[ext] ?? undefined;

  return kernel.lintText(text, {
    filePath: filename,
    ext,
    plugins: [
      {
        pluginId: 'markdown',
        plugin: options.plugin,
        options: pluginOptions,
      },
    ],
    rules: options.rules,
  });
}

// ───────────────────── validator
function validateMessages(actual: E2EErrorMessage[], expected: E2EErrorMessage[]) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((msg, i) => {
    const exp = expected[i];
    expect(msg.line).toBe(exp.line);
    expect(msg.message).toContain(exp.message);
  });
}

// ───────────────────── export object
export const lintText = {
  parseMarkdownInput,
  parseExpectedJson,
  lintText: lintTextFn,
  validateMessages,
};
