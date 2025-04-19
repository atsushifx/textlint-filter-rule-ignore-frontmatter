// src: helpers/utils/e2e-linttext-helper.ts
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// Markdownベースのユニットテスト（input.md + output.json）形式に対応した
// テキスト入力用のTextlintユーティリティ関数群。
// 構文抽出・lint実行・検証をそれぞれ独立した構造で提供する。
//
//<<

// vitest
import { expect } from 'vitest';

// Textlint
import { TextlintKernel } from '@textlint/kernel';

// types
import type { E2EErrorMessage, E2ETestOptions } from '@/types';

/**
 * Markdown形式のinput.mdから filename, text, ext を抽出
 */
const parseMarkdownInput = (markdown: string) => {
  const filenameMatch = markdown.match(/^filename:\s*(.+)$/m);
  const inputBlockMatch = markdown.match(/```(?:[\w]*)\n([\s\S]*?)```/m);

  expect(filenameMatch && inputBlockMatch).toBeTruthy();

  const filename = filenameMatch?.[1]?.trim() ?? '<markdown>';
  const text = inputBlockMatch?.[1] ?? '';
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : '.md';

  return { filename, text, ext };
};

/**
 * output.json 文字列をパースして期待結果を取得
 */
const parseExpectedJson = (jsonText: string): E2EErrorMessage[] => {
  return JSON.parse(jsonText);
};

/**
 * Textlint を実行して lint 結果を返す
 */
const lintText = async (
  text: string,
  filename: string,
  ext: string,
  options: E2ETestOptions,
) => {
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
};

/**
 * lint の実行結果と期待結果を比較・検証
 */
const validateMessages = (
  actual: E2EErrorMessage[],
  expected: E2EErrorMessage[],
) => {
  expect(actual.length).toBe(expected.length);
  actual.forEach((msg, i) => {
    const exp = expected[i];
    expect(msg.line).toBe(exp.line);
    expect(msg.message).toContain(exp.message);
  });
};

// export
export { lintText, parseExpectedJson, parseMarkdownInput, validateMessages };
