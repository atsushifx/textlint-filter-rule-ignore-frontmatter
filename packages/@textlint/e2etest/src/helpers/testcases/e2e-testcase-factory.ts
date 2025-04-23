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
import path from 'path';

import { lintFileHelper } from '@/index';

import type { E2ETestOptions } from '@/types';
// libs

// lint

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
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  return {
    suiteTitle,
    testLabel,
    run: async (): Promise<void> => {
      console.debug(`[debug/createE2ELintTestCase]: ${caseDir} / ${caseName}`);
      const parsed = lintFileHelper.parseLintFile(caseDir, caseName);

      const { inputPath, text, ext } = parsed.input;
      const expected = parsed.output;
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
};

//
// --- exports

/**
 * E2E テストケース生成ユーティリティ群のバンドルエクスポート。
 */
export const e2eFactories = {
  createE2ELintTestCase,
};
