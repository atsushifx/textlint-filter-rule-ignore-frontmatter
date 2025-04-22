// src: helpers/testcases/e2e-testcase-factory.ts
// @(#) : 各種テストケース作成
//
// Copyright (c) 2025 atsushifx
// Released under the MIT License
//
// @description<<
// 指定フォルダ内の fixture パターンに従って、E2E テストケースを生成するファクトリー。
// <<

// types
import type { E2ETestOptions } from '@/types';
import type { Dirent, } from 'fs';
=

// libs
import path from 'path';

// lint
import { lintFileHelper, } from '@/index';

// --- utility functions
/**
 * 単一の lint テストケースを構築します。
 */
export const createE2ELintTestCase = (
  caseDir: string,
  caseName: string,
  options: E2ETestOptions,
  label?: string,
) => {
  const categoryName = path.basename(caseDir,);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  return {
    suiteTitle,
    testLabel,
    run: async (): Promise<void> => {
      console.debug(`[debug/createE2ELintTestCase]: ${caseDir} / ${caseName}`,);
      const parsed = lintFileHelper.parseLintFile(caseDir, caseName,);

<<<<<<< HEAD

      assert.ok(parsed, `Missing fixture in ${caseDir}/${caseName}`);

      const { inputPath, text, ext} = parsed!.input;
||||||| parent of 75e7f4c (feat(e2e): テスト初期化系ユーティリティを setup に統合)
      assert.ok(parsed, `Missing fixture in ${caseDir}/${caseName}`,);

      const { inputPath, text, ext, } = parsed!.input;
=======
      const { inputPath, text, ext, } = parsed!.input;
>>>>>>> 75e7f4c (feat(e2e): テスト初期化系ユーティリティを setup に統合)
      const expected = parsed!.output;
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
};

/**
 * 指定ディレクトリ直下の fixture ケース群をスキャンし、対応する E2E lint テストケース群を生成します。
 *
 * @param caseDir - fixture ベースディレクトリ（'fixtures/xxx' の 'xxx' 部分）
 * @param options - lint 実行時に使用する Textlint オプション
 * @returns テストケースオブジェクトの配列
 */
export const createE2EFixtureTestCases = (
  caseDir: string,
  options: E2ETestOptions,
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
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
};

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

  return listFixtureCases(baseDir).map((caseName) => createE2ELintTestCase(caseDir, caseName, options)
};

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
  return listFixtureCases(categorizedBase,).flatMap((category,) => {
    const caseBase = path.join(categorizedBase, category,);
    return listFixtureCases(caseBase,).map((caseName,) => {
      const caseDir = path.join(caseFixtureDir, category,);
      return createE2ELintTestCase(caseDir, caseName, options,);
    },);
  },);
};

//
// --- exports

/**
 * E2E テストケース生成ユーティリティ群のバンドルエクスポート。
 */
export const e2eFactories = {
  createE2ELintTestCase,
  createE2EFixtureTestCases,
  createE2ECategorizedFixtureTestCases,
};
