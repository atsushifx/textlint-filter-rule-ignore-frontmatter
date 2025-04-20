// src: helpers/utils/e2e-lintfile-helper.ts
// @(#) : e2e-lintfile-helper.ts
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// fixture ベースの lint 実行ユーティリティ。
// input.md, output.json を読み込み、TextlintKernel で lint 実行 → 結果を検証。
// <<

// --- imports
// expect from DI runner
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';

// libs
import fs from 'fs';
import path from 'path';

// textlint
import { TextlintKernel } from '@textlint/kernel';
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';
import { expect } from 'vitest';

/**
 * default kernel
 */
const defaultKernel = new TextlintKernel();

/**
 * 指定された fixture ディレクトリから input.md と output.json を読み取り、
 * テスト用のパース済み情報を返却します。
 *
 * @param caseDir - fixture 親ディレクトリ（例: fixtures/markdown-fixtures）
 * @param caseName - 各テストケースのサブディレクトリ名（例: todo-in-markdown）
 * @returns 入力ファイルのパス・テキスト・期待されるメッセージ群など
 */
const parseLintFile = (caseDir: string, caseName: string): E2EParsedFixture => {
  // expect DI
  const expectFunc = getE2EExpect();

  const caseAbsoluteDir = caseDir.startsWith('tests')
    ? path.join(caseDir, caseName)
    : path.join('tests', caseDir, caseName);

  const inputFile = fs
    .readdirSync(caseAbsoluteDir)
    .find((f) => f.startsWith('input.') && fs.statSync(path.join(caseAbsoluteDir, f)).isFile());

  expectFunc(inputFile, `No input file found in ${caseDir}/${caseName}. Expected a file like 'input.md'.`).toBeTruthy();


  const inputPath = path.join(caseAbsoluteDir, inputFile!);
  const outputPath = path.join(caseAbsoluteDir, 'output.json');

  const text = fs.readFileSync(inputPath, 'utf8');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as E2EErrorMessage[];
  const ext = path.extname(inputPath);

  return { inputPath, text, expected, ext };
}

/**
 * TextlintKernel により lint を実行し、メッセージとファイルパスを返す。
 *
 * @param text - Lint 対象テキスト本文
 * @param inputPath - 仮想または実パスとしての対象ファイル
 * @param ext - ファイル拡張子（.md など）
 * @param options - E2E 用の Textlint 設定オブジェクト
 * @returns 実行結果（filePath と messages を含む）
 */
const lintFile: E2ELintFunction = async (
  text,
  inputPath,
  ext,
  options,
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
 * 実行された lint 結果と、期待される output.json の中身を比較し検証します。
 *
 * @param actual - 実際に取得されたエラーメッセージ配列
 * @param expected - 期待されるエラーメッセージ配列（output.json由来）
 */
const validateMessages = (
  actual: E2EErrorMessage[],
  expected: E2EErrorMessage[]
): void => {
  const expectFunc = getE2EExpect();

  expectFunc(actual.length).toBe(expected.length);
  actual.forEach((msg, i) => {
    const exp = expected[i];
    expectFunc(msg.line).toBe(exp.line);
    expectFunc(msg.message).toContain(exp.message);
  });
}

// ───────── export
export const lintFileHelper = {
  parseLintFile,
  lintFile,
  validateMessages,
};
