// src: helpers/utils/e2e-runner-fixture.ts
// @(#) : e2e-runner-fixture.ts
//
// @description<<
// fixture ベースの E2E テスト runner。
// describe / it を用いてファイル単位・カテゴリ単位のテストを実行する。
// <<

// vitest
import { describe, expect, it } from 'vitest';

// types
import type { E2ETestOptions } from '@/types';

// libs
import fs from 'fs';
import path from 'path';

// lint
import { lintFileHelper } from '@/index';

function getLintTestCase(
  caseDir: string,
  caseName: string,
  options: E2ETestOptions,
  label?: string,
) {
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  return {
    suiteTitle,
    testLabel,
    run: async () => {
      console.debug(`[debug/runLintTestCase]: ${caseDir} / ${caseName}`);
      const parsed = lintFileHelper.parseLintFile(caseDir, caseName);
      expect(parsed, `Missing fixture in ${caseDir}/${caseName}`).toBeTruthy();

      const { inputPath, text, ext, expected } = parsed!;
      const result = await lintFileHelper.lintFile(text, inputPath, ext, options);
      lintFileHelper.validateMessages(result.messages, expected);
    },
  };
}

// --- export
// runFixture ...
export const runFixtures = {
  getLintTestCase,
};

export { getLintTestCase };
