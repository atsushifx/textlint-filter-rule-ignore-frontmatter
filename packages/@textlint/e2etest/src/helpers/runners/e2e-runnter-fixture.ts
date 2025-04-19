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
import { lintFile } from '@/helpers';

function runLintTestCase(caseDir: string, caseName: string, options: E2ETestOptions) {
  return async () => {
    const parsed = lintFile.parseLintFile(caseDir, caseName);
    expect(parsed, `Missing fixture in ${caseDir}/${caseName}`).toBeTruthy();

    const { inputPath, text, ext, expected } = parsed!;
    const result = await lintFile.lintFileFn(text, inputPath, ext, options);
    lintFile.validateMessages(result.messages, expected);
  };
}

function describeFixtureCase(
  caseDir: string,
  caseName: string,
  options: E2ETestOptions,
  label?: string,
) {
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  describe(suiteTitle, () => {
    it(testLabel, runLintTestCase(caseDir, caseName, options));
  });
}

function runLintFixtureTests(categoryPath: string, options: E2ETestOptions, label?: string) {
  const rootDir = path.join('tests', categoryPath);
  if (!fs.existsSync(rootDir)) throw new Error(`Fixture directory not found: ${rootDir}`);

  const cases = fs
    .readdirSync(rootDir)
    .filter((name) => {
      const fullPath = path.join(rootDir, name);
      return fs.statSync(fullPath).isDirectory() && !name.startsWith('#');
    });

  describe(`Lint Fixtures from ${label ?? categoryPath}`, () => {
    for (const caseName of cases) {
      it(`should lint correctly: ${caseName}`, runLintTestCase(categoryPath, caseName, options));
    }
  });
}

function runCategorizedLintFixtureTests(
  fixturesDir: string,
  options: E2ETestOptions,
  label?: string,
) {
  const rootDir = path.join('tests', fixturesDir);

  const categories = fs
    .readdirSync(rootDir)
    .filter((name) => {
      const fullPath = path.join(rootDir, name);
      return (
        fs.statSync(fullPath).isDirectory()
        && !name.startsWith('@')
        && !name.startsWith('#')
      );
    });

  for (const category of categories) {
    const categoryPath = path.join(fixturesDir, category);
    runLintFixtureTests(categoryPath, options, label);
  }
}

export const runFixture = {
  describeFixtureCase,
  runLintFixtureTests,
  runCategorizedLintFixtureTests,
};
