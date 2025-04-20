// src: helpers/utils/e2e-lintfile-helper.ts
// @(#) : e2e-lintfile-helper.ts
//
// Copyright (c) 2025 Furukawa Atsushi
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// fixture ベースの lint 実行ユーティリティ。
// input.md, output.json を読み込み、TextlintKernel で lint 実行 → 結果を検証。
// <<

// --- imports
// type
import type { E2EErrorMessage, E2ETestOptions } from '@/types';
// vitest
import { expect } from 'vitest';

// libs
import fs from 'fs';
import path from 'path';

// textlint
import { TextlintKernel } from '@textlint/kernel';

// ---- global variables

const defaultKernel = new TextlintKernel();

// ───────── parser
function parseLintFile(caseDir: string, caseName: string) {
  const caseAbsoluteDir = path.join('tests', caseDir, caseName);

  const inputFile = fs
    .readdirSync(caseAbsoluteDir)
    .find((f) => f.startsWith('input.') && fs.statSync(path.join(caseAbsoluteDir, f)).isFile());

  expect(inputFile, `No input file found in ${caseDir}/${caseName}`).toBeTruthy();

  const inputPath = path.join(caseAbsoluteDir, inputFile!);
  const outputPath = path.join(caseAbsoluteDir, 'output.json');

  const text = fs.readFileSync(inputPath, 'utf8');
  const expected = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as E2EErrorMessage[];
  const ext = path.extname(inputPath);

  return { inputPath, text, expected, ext };
}
// ───────── linter
async function lintFileFn(
  text: string,
  inputPath: string,
  ext: string,
  options: E2ETestOptions,
) {
  const kernel = options.kernel ?? defaultKernel;
  const pluginOptions = options.pluginOptionsByExt?.[ext] ?? undefined;

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
}

// ───────── validator
function validateMessages(actual: E2EErrorMessage[], expected: E2EErrorMessage[]) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((msg, i) => {
    const exp = expected[i];
    expect(msg.line).toBe(exp.line);
    expect(msg.message).toContain(exp.message);
  });
}

// ───────── export
export const lintFile = {
  parseLintFile,
  lintFileFn,
  validateMessages,
};
