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

import type { Dirent } from 'fs';

// libs
import path from 'path';
import fs from 'fs';
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

  return listFixtureCases(baseDir).map((caseName) =>
    createE2ELintTestCase(caseDir, caseName, options))
};


// --- export
export const e2eFactories = {
  createE2ELintTestCase,
  createE2EFixtureTestCases,
}

// https://opensource.org/licenses/MIT

