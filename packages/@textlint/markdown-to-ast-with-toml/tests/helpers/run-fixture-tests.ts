// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// UnitTest
import { describe, expect, it } from 'vitest';

// Type
import type { TxtNode } from '@textlint/ast-node-types';

// libs
import fs from 'fs';
import path from 'path';
/**
 * 単一カテゴリディレクトリ内のテストを実行
 * @param categoryPath 絶対パス
 * @param parser ASTパーサー関数
 */
function runUnitFixtureTests(categoryPath: string, parser: (text: string) => TxtNode, label?: string) {
  const fixtureCases = fs.readdirSync(categoryPath).filter((dirName) => {
    const fullPath = path.join(categoryPath, dirName);
    return fs.statSync(fullPath).isDirectory();
  });

  describe(`Fixtures from ${label ?? path.basename(categoryPath)}`, () => {
    for (const caseName of fixtureCases) {
      if (caseName.startsWith('#')) {
        console.warn(`⚠ Skipping fixture case "${caseName}"`);
        continue;
      }

      const caseDir = path.join(categoryPath, caseName);
      const inputPath = path.join(caseDir, 'input.md');
      const outputPath = path.join(caseDir, 'output.json');

      it(`should match AST for "${caseName}"`, () => {
        const inputText = fs.readFileSync(inputPath, 'utf-8');
        const expected = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        const actual = parser(inputText);
        expect(actual).toEqual(expected);
      });
    }
  });
}

/**
 * fixtures/ 下の各カテゴリディレクトリを走査し、
 * その中で runUnitFixtureTests を実行
 */
export function runCategorizedFixtureTests(
  relativeRootDir: string,
  parser: (text: string) => TxtNode,
) {
  const rootDir = path.join(__dirname, '..', relativeRootDir);
  const categories = fs.readdirSync(rootDir).filter((name) => {
    const fullPath = path.join(rootDir, name);
    return fs.statSync(fullPath).isDirectory() && !name.startsWith('@');
  });

  for (const category of categories) {
    if (category.startsWith('@')) { // if directory starts with '@', skip these tests.
      console.warn(`⚠ Skipping fixture category "${category}"`);
      continue;
    }
    const categoryDir = path.join(rootDir, category);
    runUnitFixtureTests(categoryDir, parser, `${relativeRootDir}/${category}`);
  }
}

// export
export { runUnitFixtureTests };
