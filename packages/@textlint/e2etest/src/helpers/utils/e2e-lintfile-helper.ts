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

<<<<<<< HEAD
// --- imports
// expect from DI runner
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';
||||||| parent of 61113ec (chore: format by dprint)
// -- imports
// types
import type { E2EErrorMessage, E2ETestOptions, } from '@/types';
import type { E2ELintFunction, E2ELintResult, E2EParsedFixture, E2EParsedFixtureInput, } from '@/types/e2e-lint.types';
=======
// -- imports
// types
import type { E2EErrorMessage, E2ETestOptions } from '@/types';
import type { E2ELintFunction, E2ELintResult, E2EParsedFixture, E2EParsedFixtureInput } from '@/types/e2e-lint.types';
>>>>>>> 61113ec (chore: format by dprint)

// libs
import fs from 'fs';
import path from 'path';

<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
// E2E Test
import { E2E, } from '@/index';

=======
// E2E Test
import { E2E } from '@/index';

>>>>>>> 61113ec (chore: format by dprint)
// textlint
<<<<<<< HEAD
import { TextlintKernel } from '@textlint/kernel';
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';
import { expect } from 'vitest';
||||||| parent of 61113ec (chore: format by dprint)
import { getE2EExpect, } from '@/helpers/core/e2e-expect-runner';
=======
import { getE2EExpect } from '@/helpers/core/e2e-expect-runner';
>>>>>>> 61113ec (chore: format by dprint)

<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
//
import { TextlintKernel, } from '@textlint/kernel';

// --- constants
=======
//
import { TextlintKernel } from '@textlint/kernel';

// --- constants
>>>>>>> 61113ec (chore: format by dprint)
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
<<<<<<< HEAD
  // expect DI
  const expectFunc = getE2EExpect();

  const caseAbsoluteDir = caseDir.startsWith('tests')
    ? path.join(caseDir, caseName)
    : path.join('tests', caseDir, caseName);
||||||| parent of 61113ec (chore: format by dprint)
const parseLintFile = (caseDir: string, caseName: string,): E2EParsedFixture => {
  const absCaseSuitePath = E2E.fixturePaths.getFixtureTestPath(caseDir, caseName,);
  console.debug('[parseLintFile] absCaseSuitePath=', absCaseSuitePath,);
=======
  const absCaseSuitePath = E2E.fixturePaths.getFixtureTestPath(caseDir, caseName);
  console.debug('[parseLintFile] absCaseSuitePath=', absCaseSuitePath);
>>>>>>> 61113ec (chore: format by dprint)

  const inputFile = fs
<<<<<<< HEAD
    .readdirSync(caseAbsoluteDir)
    .find((f) => f.startsWith('input.') && fs.statSync(path.join(caseAbsoluteDir, f)).isFile());
||||||| parent of 61113ec (chore: format by dprint)
    .readdirSync(absCaseSuitePath,)
    .find(
      (f,) => f.startsWith('input.',) && fs.statSync(path.join(absCaseSuitePath, f,),).isFile(),
    );
=======
    .readdirSync(absCaseSuitePath)
    .find(
      (f) => f.startsWith('input.') && fs.statSync(path.join(absCaseSuitePath, f)).isFile(),
    );
>>>>>>> 61113ec (chore: format by dprint)

  expectFunc(inputFile, `No input file found in ${caseDir}/${caseName}. Expected a file like 'input.md'.`).toBeTruthy();

<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
  // 入力
  const inputPath = path.join(absCaseSuitePath, inputFile!,);
  const text = fs.readFileSync(inputPath, 'utf8',);
  const ext = path.extname(inputPath,) || '.md';
=======
  // 入力
  const inputPath = path.join(absCaseSuitePath, inputFile!);
  const text = fs.readFileSync(inputPath, 'utf8');
  const ext = path.extname(inputPath) || '.md';
>>>>>>> 61113ec (chore: format by dprint)

<<<<<<< HEAD
  const inputPath = path.join(caseAbsoluteDir, inputFile!);
  const outputPath = path.join(caseAbsoluteDir, 'output.json');
||||||| parent of 61113ec (chore: format by dprint)
  // 出力
  const outputPath = path.join(absCaseSuitePath, 'output.json',);
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8',),) as E2EErrorMessage[];
=======
  // 出力
  const outputPath = path.join(absCaseSuitePath, 'output.json');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as E2EErrorMessage[];
>>>>>>> 61113ec (chore: format by dprint)

  const text = fs.readFileSync(inputPath, 'utf8');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as E2EErrorMessage[];
  const ext = path.extname(inputPath);

<<<<<<< HEAD
  return { inputPath, text, expected, ext };
}
||||||| parent of 61113ec (chore: format by dprint)
  return { input: parsedInput, output: expected, };
};
=======
  return { input: parsedInput, output: expected };
};
>>>>>>> 61113ec (chore: format by dprint)

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
<<<<<<< HEAD
  });
}
||||||| parent of 61113ec (chore: format by dprint)
    expectFunc(msg.line,).toBe(exp.line,);
    expectFunc(msg.message,).toContain(exp.message,);
=======
>>>>>>> 61113ec (chore: format by dprint)

<<<<<<< HEAD
// ───────── export
||||||| parent of 61113ec (chore: format by dprint)
    // 例: デバッグ時に役立つコメント (任意)
    // console.debug(`[validateMessages] #${i} expected=${exp.message}, actual=${msg.message}`);
  },);
};

// --- exports
=======
    // 例: デバッグ時に役立つコメント (任意)
    // console.debug(`[validateMessages] #${i} expected=${exp.message}, actual=${msg.message}`);
  });
};

// --- exports
>>>>>>> 61113ec (chore: format by dprint)
export const lintFileHelper = {
  parseLintFile,
  lintFile,
  validateMessages,
};
