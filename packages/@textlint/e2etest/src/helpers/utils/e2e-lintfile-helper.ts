// src: helpers/utils/e2e-lintfile-helper.ts
// @(#) : fixture パターン用に、ファイルのよ見込み、パースなどを行うユーティリティパッケージ
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
// types
import type { E2EErrorMessage, E2ETestOptions } from '@/types';
import type { E2ELintFunction, E2ELintResult, E2EParsedFixture, E2EParsedFixtureInput } from '@/types/e2e-lint.types';

// expect from DI runner
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';

// libs
import fs from 'fs';
import path from 'path';

// textlint
import { TextlintKernel } from '@textlint/kernel';

// -- from This Project
import { E2E } from '@/index';

// --- constants
/**
 * default kernel
 */
const defaultKernel = new TextlintKernel();

/**
 * 指定されたテストケースディレクトリから `input.*` ファイルと `output.json` を読み取り、
 * テスト用にパースされたデータ構造を返す。
 *
 * @param caseDir - テストケースカテゴリ（例: fixtures/markdown）
 * @param caseName - 各テストケースのディレクトリ名（例: heading-error）
 * @returns パース済みfixtureデータ（入力パス・テキスト・拡張子・期待エラー）
 */
const parseLintFile = (caseDir: string, caseName: string): E2EParsedFixture => {
  const absCaseSuiteDir = E2E.fixturePaths.getFixtureTestPath(caseDir, caseName);
  console.debug('[parseLintFile] absCaseSuiteDir=', absCaseSuiteDir);

  const inputFile = fs
    .readdirSync(absCaseSuiteDir)
    .find(
      (f) => f.startsWith('input.') && fs.statSync(path.join(absCaseSuiteDir, f)).isFile(),
    );

  if (!inputFile) {
    throw new Error(
      `[parseLintFile] No input file found in "${caseDir}/${caseName}". Expected a file like 'input.md'.`,
    );
  }

  // 入力
  const inputPath = path.join(absCaseSuiteDir, inputFile!);
  const text = fs.readFileSync(inputPath, 'utf8');
  const ext = path.extname(inputPath) || '.md';
  const parsedInput: E2EParsedFixtureInput = { inputPath, text, ext };

  // 出力
  const outputPath = path.join(absCaseSuiteDir, 'output.json');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as E2EErrorMessage[];
  return { input: parsedInput, output: expected };
};

/**
 * TextlintKernel を使ってテキストの Lint を実行する。
 *
 * @param text - 対象のテキスト本文
 * @param inputPath - ファイルパス（仮想または実ファイル）
 * @param ext - ファイル拡張子（.md など）
 * @param options - Textlint 設定オブジェクト
 * @returns Lint 結果（メッセージ配列を含む）
 */
const lintFile: E2ELintFunction = async (
  inputPath: string,
  text: string,
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
 * Lint 実行結果と output.json の期待値を比較し、検証を行う。
 * 各エラーの `line` および `message` の部分一致を評価する。
 *
 * @param actual - 実行された Lint 結果
 * @param expected - output.json から読み込んだ期待されるメッセージ群
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

// --- exports

export const lintFileHelper = {
  parseLintFile,
  lintFile,
  validateMessages,
};
