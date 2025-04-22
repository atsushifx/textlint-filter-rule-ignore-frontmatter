// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.// src: helpers/testcases/e2e-testcase-factory.ts
// @(#) : 各種テストケース作成
//
// @description<<// src: helpers/testcases/e2e-testcase-factory.ts
// @(#) : 各種テストケース作成
//
// @description<<
// 指定フォルダ内の fixture パターンに従って、E2E テストケースを生成するファクトリー。
// <<

// types
import type { E2ETestOptions } from '@/types';
<<<<<<< HEAD

||||||| parent of 61113ec (chore: format by dprint)
import type { E2ETestOptions, } from '@/types';
import type { Dirent, } from 'fs';
=======
>>>>>>> 61113ec (chore: format by dprint)
import type { Dirent } from 'fs';

// libs
<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
import { strict as assert, } from 'assert';
import fs from 'fs';
=======
import { strict as assert } from 'assert';
import fs from 'fs';
>>>>>>> 61113ec (chore: format by dprint)
import path from 'path';
import fs from 'fs';
import { strict as assert } from 'assert';

// lint
import { lintFileHelper } from '@/index';

/**
<<<<<<< HEAD
 * 単一の lint テストケースを構築します。
||||||| parent of 61113ec (chore: format by dprint)
 * 指定されたベースディレクトリ内にある、有効な fixture ケースディレクトリ名を返す。
 * '@' および '#' で始まる名前のディレクトリは無視される。
 *
 * @param baseDir - fixture ディレクトリのパス
 * @returns フィルター済みのディレクトリ名リスト
 */
const listFixtureCases = (baseDir: string,): string[] => {
  return fs
    .readdirSync(baseDir, { withFileTypes: true, },) // Dirent[]
    .filter((entry: Dirent,) => entry.isDirectory())
    .map((entry: Dirent,) => entry.name)
    .filter((name: string,) => !name.startsWith('@',) && !name.startsWith('#',));
};

// --- library functions
/**
 * 指定された fixture 情報をもとに、単一の E2E lint テストケースを作成します。
 *
 * @param caseDir - テスト対象のベースディレクトリ（例: 'fixtures/markdown-fixtures'）
 * @param caseName - テストケース名（ディレクトリ名）
 * @param options - lint 実行時に使用する Textlint オプション
 * @param label - 任意のテスト表示名（未指定なら 'caseDir/caseName' が使われます）
 * @returns テストスイートとテストラベル、実行関数を含むテストオブジェクト
=======
 * 指定されたベースディレクトリ内にある、有効な fixture ケースディレクトリ名を返す。
 * '@' および '#' で始まる名前のディレクトリは無視される。
 *
 * @param baseDir - fixture ディレクトリのパス
 * @returns フィルター済みのディレクトリ名リスト
 */
const listFixtureCases = (baseDir: string): string[] => {
  return fs
    .readdirSync(baseDir, { withFileTypes: true }) // Dirent[]
    .filter((entry: Dirent) => entry.isDirectory())
    .map((entry: Dirent) => entry.name)
    .filter((name: string) => !name.startsWith('@') && !name.startsWith('#'));
};

// --- library functions
/**
 * 指定された fixture 情報をもとに、単一の E2E lint テストケースを作成します。
 *
 * @param caseDir - テスト対象のベースディレクトリ（例: 'fixtures/markdown-fixtures'）
 * @param caseName - テストケース名（ディレクトリ名）
 * @param options - lint 実行時に使用する Textlint オプション
 * @param label - 任意のテスト表示名（未指定なら 'caseDir/caseName' が使われます）
 * @returns テストスイートとテストラベル、実行関数を含むテストオブジェクト
>>>>>>> 61113ec (chore: format by dprint)
 */
export const createE2ELintTestCase = (
  caseDir: string,
  caseName: string,
  options: E2ETestOptions,
  label?: string,
) => {
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  return {
    suiteTitle,
    testLabel,
    run: async (): Promise<void> => {
      console.debug(`[debug/createE2ELintTestCase]: ${caseDir} / ${caseName}`);
      const parsed = lintFileHelper.parseLintFile(caseDir, caseName);

<<<<<<< HEAD
      assert.ok(parsed, `Missing fixture in ${caseDir}/${caseName}`);

      const { inputPath, text, ext, expected } = parsed!;
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
};

// --- export
export const e2eFactories = {
  createE2ELintTestCase,
}

// 指定フォルダ内の fixture パターンに従って、E2E テストケースを生成するファクトリー。
// <<

// types
import type { E2ETestOptions } from '@/types';

// libs
import path from 'path';
import { strict as assert } from 'assert';

// lint
import { lintFileHelper } from '@/index';

/**
 * 単一の lint テストケースを構築します。
 */
export const createE2ELintTestCase = (
  caseDir: string,
  caseName: string,
  options: E2ETestOptions,
  label?: string,
) => {
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  return {
    suiteTitle,
    testLabel,
    run: async (): Promise<void> => {
      console.debug(`[debug/createE2ELintTestCase]: ${caseDir} / ${caseName}`);
      const parsed = lintFileHelper.parseLintFile(caseDir, caseName);

      assert.ok(parsed, `Missing fixture in ${caseDir}/${caseName}`);

      const { inputPath, text, ext, expected } = parsed!;
||||||| parent of 61113ec (chore: format by dprint)
      const { inputPath, text, ext, } = parsed!.input;
      const expected = parsed!.output;
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options,);
      lintFileHelper.validateMessages(result.messages, expected,);
=======
      const { inputPath, text, ext } = parsed!.input;
      const expected = parsed!.output;
>>>>>>> 61113ec (chore: format by dprint)
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
};

/**
 * 指定されたベースディレクトリ内にある、有効な fixture ケースディレクトリ名を返す。
 * '@' および '#' で始まる名前のディレクトリは無視される。
 *
 * @param baseDir - fixture ディレクトリのパス
 * @returns フィルター済みのディレクトリ名リスト
 */
const listFixtureCases = (baseDir: string): string[] => {
    return fs
      .readdirSync(baseDir, { withFileTypes: true }) // Dirent[]
      .filter((entry: Dirent) => entry.isDirectory())
      .map((entry: Dirent) => entry.name)
      .filter((name: string) => !name.startsWith('@') && !name.startsWith('#'));
    };

/**
 * fixtureディレクトリを走査して、E2Eテストケースをまとめて生成する。
 * '@' または '#' で始まるディレクトリはスキップされる。
 */
export const createE2EFixtureTestCases = (
  caseDir: string,
  options: E2ETestOptions
) => {
  const baseDir = path.join('tests', caseDir);

<<<<<<< HEAD
  return listFixtureCases(baseDir).map((caseName) =>
    createE2ELintTestCase(caseDir, caseName, options))
||||||| parent of 61113ec (chore: format by dprint)
  return listFixtureCases(baseDir,).map((caseName,) => createE2ELintTestCase(caseDir, caseName, options,));
=======
  return listFixtureCases(baseDir).map((caseName) => createE2ELintTestCase(caseDir, caseName, options));
>>>>>>> 61113ec (chore: format by dprint)
};

<<<<<<< HEAD
||||||| parent of 61113ec (chore: format by dprint)
/**
 * サブカテゴリ構造を持つ fixture ディレクトリ構成をスキャンし、階層ごとに分類された E2E lint テストケースを生成します。
 *
 * @param caseFixtureDir - テスト対象のトップディレクトリ（例: 'fixtures/markdown-fixtures'）
 * @param options - lint 実行時に使用する Textlint オプション
 * @returns カテゴリ単位で生成されたテストケースのフラットな配列
 */
export const createE2ECategorizedFixtureTestCases = (
  caseFixtureDir: string,
  options: E2ETestOptions,
) => {
  const categorizedBase = path.join('tests', caseFixtureDir,);
=======
/**
 * サブカテゴリ構造を持つ fixture ディレクトリ構成をスキャンし、階層ごとに分類された E2E lint テストケースを生成します。
 *
 * @param caseFixtureDir - テスト対象のトップディレクトリ（例: 'fixtures/markdown-fixtures'）
 * @param options - lint 実行時に使用する Textlint オプション
 * @returns カテゴリ単位で生成されたテストケースのフラットな配列
 */
export const createE2ECategorizedFixtureTestCases = (
  caseFixtureDir: string,
  options: E2ETestOptions,
) => {
  const categorizedBase = path.join('tests', caseFixtureDir);
>>>>>>> 61113ec (chore: format by dprint)

<<<<<<< HEAD
// --- export
||||||| parent of 61113ec (chore: format by dprint)
  return listFixtureCases(categorizedBase,).flatMap((category,) => {
    const caseBase = path.join(categorizedBase, category,);
    return listFixtureCases(caseBase,).map((caseName,) => {
      const caseDir = path.join(caseFixtureDir, category,);
      return createE2ELintTestCase(caseDir, caseName, options,);
    },);
  },);
};

// --- exports

/**
 * E2E テストケース生成ユーティリティ群のバンドルエクスポート。
 */
=======
  return listFixtureCases(categorizedBase).flatMap((category) => {
    const caseBase = path.join(categorizedBase, category);
    return listFixtureCases(caseBase).map((caseName) => {
      const caseDir = path.join(caseFixtureDir, category);
      return createE2ELintTestCase(caseDir, caseName, options);
    });
  });
};

// --- exports

/**
 * E2E テストケース生成ユーティリティ群のバンドルエクスポート。
 */
>>>>>>> 61113ec (chore: format by dprint)
export const e2eFactories = {
  createE2ELintTestCase,
  createE2EFixtureTestCases,
}

// https://opensource.org/licenses/MIT

