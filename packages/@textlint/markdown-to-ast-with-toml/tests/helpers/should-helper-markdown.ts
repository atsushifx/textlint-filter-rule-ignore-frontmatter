// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { TxtNode } from '@textlint/ast-node-types';
import assert from 'assert';

function shouldHaveImplementTxtNode(node: TxtNode, rawValue: string) {
  const lines = rawValue.split('\n');
  const lastLine = lines[lines.length - 1];
  assert.strictEqual(node.raw, rawValue);
  assert.deepStrictEqual(node.loc, {
    start: { line: 1, column: 0 },
    end: { line: lines.length, column: lastLine.length },
  });
  assert.deepStrictEqual(node.range, [0, rawValue.length]);
}

function shouldHaveImplementInlineTxtNode(node: TxtNode, text: string, allText: string) {
  const startColumn = allText.indexOf(text);

  if (startColumn === -1) {
    throw new Error(`text "${text}" not found in allText`);
  }

  assert.strictEqual(node.raw, text);
  assert.deepStrictEqual(node.loc, {
    start: { line: 1, column: startColumn }, // Assume node is on the first line for inline tests
    end: { line: 1, column: startColumn + text.length },
  });
  assert.deepStrictEqual(node.range, [startColumn, startColumn + text.length]);
}

export { shouldHaveImplementInlineTxtNode, shouldHaveImplementTxtNode };
