// UnitTest
import { describe, expect, it } from 'vitest';

// Type
import type { TextlintLintTestOptions } from '../types/textlint-fixture.types.js';

// Libs
import fs from 'fs';
import path from 'path';

// TextLint
import { TextlintKernel } from '@textlint/kernel';
const defaultKernel = new TextlintKernel(); // ✅ fallback用カーネル

/**
 * 単一ケース実行
 */
async function runLintTestCase(
  caseDir: string,
  caseName: string,
  options: TextlintLintTestOptions,
) {
  const kernel = options.kernel ?? defaultKernel;

  const caseAbsoluteDir = path.join('tests', caseDir, caseName);

  const inputFile = fs
    .readdirSync(caseAbsoluteDir)
    .find((f) => f.startsWith('input.') && fs.statSync(path.join(caseAbsoluteDir, f)).isFile());

  if (!inputFile) {
    console.warn(`⚠ No input file in "${caseDir}"`);
    return;
  }

  const inputPath = path.join(caseAbsoluteDir, inputFile);
  const ext = path.extname(inputPath);
  const pluginOptions = options.pluginOptionsByExt?.[ext] ?? undefined;
  const outputPath = path.join(caseAbsoluteDir, 'output.json');

  const text = fs.readFileSync(inputPath, 'utf8');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as {
    line: number;
    message: string;
  }[];

  const result = await kernel.lintText(text, {
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

  const actualMessages = result.messages;

  // 行番号 + エラーメッセージ
  expect(actualMessages.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    const actual = actualMessages[i];
    const expectedItem = expected[i];

    expect(actual.line).toBe(expectedItem.line);
    expect(actual.message).toContain(expectedItem.message);
  }
}

function describeFixtureCase(
  caseDir: string,
  caseName: string,
  options: TextlintLintTestOptions,
  label?: string,
) {
  const categoryName = path.basename(caseDir);
  const suiteTitle = `suite: ${categoryName} / case: ${caseName}`;
  const testLabel = label ?? `${caseDir}/${caseName}`;

  describe(suiteTitle, () => {
    it(testLabel, async () => {
      await runLintTestCase(caseDir, caseName, options);
    });
  });
}

/**
 * カテゴリ単体実行
 */
function runLintFixtureTests(
  categoryPath: string ,
  options: TextlintLintTestOptions,
  label?: string,
) {
  const rootDir = path.join('tests', categoryPath);

    console.d

  if (!fs.existsSync(categoryPath)) {
    throw new Error(`Fixture directory not found: ${categoryPath}`);
  }

  const cases = fs
    .readdirSync(categoryPath)
    .filter((name) => fs.statSync(path.join(categoryPath, name)).isDirectory());

  describe(`Lint Fixtures from ${label ?? relativeCategoryPath}`, () => {
    for (const caseName of cases) {
      if (caseName.startsWith('#')) continue;

      const caseRelativeDir = path.join(relativeCategoryPath, caseName);
      it(`should lint correctly: ${caseName}`, async () => {
        await runLintTestCase(caseRelativeDir, caseName, options);
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
  const rootDir = path.join('tests', rootRelativeDir);

  const categories = fs
    .readdirSync(rootDir)
    .filter((name) => {
      const fullPath = path.join(rootDir, name);
      return fs.statSync(fullPath).isDirectory() && !name.startsWith('@');
    });

  for (const category of categories) {
    const categoryPath = path.join(rootRelativeDir, category);
    runLintFixtureTests(categoryPath, options, `${rootRelativeDir}/${category}`);
  }
}

// export
export { describeFixtureCase, runCategorizedLintFixtureTests, runLintFixtureTests, runLintTestCase };
