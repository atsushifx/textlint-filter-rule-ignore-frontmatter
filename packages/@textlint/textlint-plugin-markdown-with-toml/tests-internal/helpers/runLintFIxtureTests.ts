// UnitTest
import { describe, expect, it } from 'vitest';

// Types
import type { TextlintLintTestOptions } from '../types/textlint-fixture-types.types.ts';

// Libs
import fs from 'fs';
import path from 'path';

// TextLint
import { TextlintKernel } from '@textlint/kernel';

/**
 * 単一ケース実行
 */
async function runLintTestCase(
  kernel: TextlintKernel,
  caseDir: string,
  caseName: string,
  options: TextlintLintTestOptions,
) {
  const inputFile = fs
    .readdirSync(caseDir)
    .find((f) => f.startsWith('input.') && fs.statSync(path.join(caseDir, f)).isFile());

  if (!inputFile) {
    console.warn(`⚠ No input file in "${caseDir}"`);
    return;
  }

  const inputPath = path.join(caseDir, inputFile);
  const ext = path.extname(inputPath);
  const pluginOptions = options.pluginOptionsByExt?.[ext] ?? undefined;
  const outputPath = path.join(caseDir, 'output.json');

  const text = fs.readFileSync(inputPath, 'utf8');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

  const result = await kernel.lintText(text, {
    filePath: inputPath,
    ext,
    plugins: [
      {
        pluginId: 'markdown',
        plugin: options.plugin,
        options: pluginOptions, // ← 修正箇所ここ！ "T" になってたのを修正
      },
    ],
    rules: options.rules,
  });

  expect(result.messages.map((m) => m.message)).toEqual(expected.messages);
}

/**
 * カテゴリ単体
 */
function runLintFixtureTests(
  categoryPath: string,
  options: TextlintLintTestOptions,
  label?: string,
) {
  const kernel = new TextlintKernel();
  const cases = fs.readdirSync(categoryPath).filter((name) => fs.statSync(path.join(categoryPath, name)).isDirectory());

  describe(`Lint Fixtures from ${label ?? path.basename(categoryPath)}`, () => {
    for (const caseName of cases) {
      if (caseName.startsWith('#')) continue;

      const caseDir = path.join(categoryPath, caseName);
      it(`should lint correctly: ${caseName}`, async () => {
        await runLintTestCase(kernel, caseDir, caseName, options);
      });
    }
  });
}

/**
 * fixtures ディレクトリ全体
 */
function runCategorizedLintFixtureTests(
  rootRelativeDir: string,
  options: TextlintLintTestOptions,
) {
  const rootDir = path.join(__dirname, '..', rootRelativeDir);
  const categories = fs.readdirSync(rootDir).filter((name) => {
    const fullPath = path.join(rootDir, name);
    return fs.statSync(fullPath).isDirectory() && !name.startsWith('@');
  });

  for (const category of categories) {
    runLintFixtureTests(
      path.join(rootDir, category),
      options,
      `${rootRelativeDir}/${category}`,
    );
  }
}

// export
export { runCategorizedLintFixtureTests, runLintFixtureTests };
