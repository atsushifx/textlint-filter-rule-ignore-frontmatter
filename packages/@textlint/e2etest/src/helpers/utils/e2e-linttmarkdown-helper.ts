// src: helpers/utils/e2e-linttext-helper.ts
// @(#) : e2e-linttext.ts
//
// Copyright (c) 2023 atsushifx
// Released under the MIT License.
//
// description<<
// E2E テスト用の  テキスト入力ユニットテスト用Helper
// <<

// --- imports
// types
import type { E2EErrorMessage, E2ELintFunction, E2ELintResult, E2EParsedFixture, E2ETestOptions } from '@/types';

// textlint
import { TextlintKernel } from '@textlint/kernel';

// expect function 外挿用コンテナ
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';
import { E2EParsedFixtureInput } from '@/types/e2e-lint.types';
import { E2EExpectFunction } from '../../types/e2e-expect.types';
import { lintFileHelper } from './e2e-lintfile-helper';

// -- constants
/**
 * default kernel
 */
const defaultKernel = new TextlintKernel();

// utility functions
const trimEachLine = (text: string): string =>
  text
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();

// main functions
/**
 * Markdown文字列から `filename:` 行とコードブロック（input）を抽出し、
 * E2Eテスト用の仮想ファイル情報に変換する。
 *
 * @param markdown - 特定形式のMarkdown文字列（filename行+コードブロック）
 *                   filename=''の場合、filename='<markdown>', ext='.md'となる
 * @returns パース結果:
 * - inputPath: filenameから取得される仮想ファイルパス
 * - text: コードブロック内部のテスト対象テキスト
 * - ext: filenameから推測された拡張子（なければ .md）
 *
 * @example
 * 以下のようなMarkdown文字列から抽出されます：
 *
 * ```markdown
 * filename: input.md
 *
 * ```
 * - [ ] TODO
 * ```
 *
 * → parse結果:
 * {
 *   inputPath: 'example.md',
 *   text: '- [ ] TODO',
 *   ext: '.md'
 * }
 */
const parseMarkdownInput = (markdown: string): E2EParsedFixtureInput => {
  const trimmedMarkdown = markdown.trim();
  const lines = trimmedMarkdown.split('\n');

  let filename: string; // ファイル名
  let textLines: string[]; // 本文

  if (lines[0].startsWith('input:')) {
    const rawFilename = lines[0].replace('input:', '').trim();
    filename = (rawFilename === '') ? '<markdown>' : rawFilename;
    textLines = lines.slice(1); // 2行目以降が本文
  } else {
    filename = '<markdown>';
    textLines = lines; // 全体が本文
  }

  const text = trimEachLine(textLines.join('\n'));
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : '.md';

  return { inputPath: filename, text, ext };
};

/**
 * JSON形式で記述された期待エラーメッセージ（output.jsonなど）を
 * パースして `E2EErrorMessage[]` に変換する。
 *
 * @param jsonText - JSON文字列（例: output.json の内容）
 * @returns E2EErrorMessage オブジェクトの配列
 *
 * @example
 * const json = `[
 *   { "line": 2, "message": "Found TODO item." },
 *   { "line": 5, "message": "Heading should not end with punctuation." }
 * ]`;
 *
 * const expected = parseExpected(json);
 * // expected: [
 * //   { line: 2, message: "Found TODO item." },
 * //   { line: 5, message: "Heading should not end with punctuation." }
 * // ]
 */
const parseExpected = (jsonText: string): E2EErrorMessage[] => {
  return JSON.parse(jsonText);
};

/**
 * TextlintKernel を使って lintText を実行し、解析結果を返す。
 *
 * @param text - Lint 対象のテキスト本文（例: Markdownソース）
 * @param inputPath - 対象ファイルの仮想または実パス（例: 'example.md'）
 * @param ext - ファイルの拡張子（例: '.md'）
 * @param options - E2Eテスト用の Textlint 設定オブジェクト
 * @returns Lint結果（filePath と message 配列を含む構造）
 *
 * @example
 * const result = await lintText("- [ ] TODO", "test.md", ".md", options);
 * console.log(result.messages[0].message); // => "Found TODO item."
 */
const lintMarkdown: E2ELintFunction = async (
  text: string,
  inputPath: string,
  ext: string,
  options: E2ETestOptions,
): Promise<E2ELintResult> => {
  const kernel = options.kernel ?? defaultKernel;
  const pluginOptions = options.pluginOptionsByExt?.[ext];

  return kernel.lintText(text, {
    filePath: inputPath,
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
 * Lint の実行結果と期待されるエラーメッセージ配列を比較し、
 * テストの成否をバリデーションする。
 *
 * 各メッセージの `line` が一致し、`message` が部分一致することを検証。
 * メッセージ数も同一である必要があります。
 *
 * @param actual - 実際に取得された lint 実行結果のメッセージ配列
 * @param expected - output.json などで定義された期待されるメッセージ配列
 *
 * @throws アサーションに失敗した場合、テストフレームワークでエラーが投げられる
 *
 * @example
 * const actual = [{ line: 3, message: "Found TODO item." }];
 * const expected = [{ line: 3, message: "TODO" }];
 *
 * validateMessages(actual, expected); // → パス（部分一致OK）
 */
const validateMessages = (
  actual: E2EErrorMessage[],
  expected: E2EErrorMessage[],
): void => {
  const expectFunc = getE2EExpect();

  expectFunc(actual.length).toBe(expected.length);

  actual.forEach((msg, i) => {
    const exp = expected[i];
    expectFunc(msg.line).toBe(exp.line);
    expectFunc(msg.message).toContain(exp.message);
  });
};
// --- export 統一形式
export const lintMarkdownHelper = {
  name: 'textlint:lintMarkdown-helper',
  parseMarkdownInput, // string → { inputPath, text, ext }
  parseExpected, // json → E2EErrorMessage[]
  lintMarkdown, // 入力テキストによるtextlint
  validateMessages, // エラーメッセージが正しく出力されているか比較
};
