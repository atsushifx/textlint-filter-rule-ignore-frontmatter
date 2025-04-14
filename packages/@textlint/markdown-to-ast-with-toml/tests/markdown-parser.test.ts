// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { beforeEach, describe, expect, it } from 'vitest';
import { parse, Syntax } from '../src/index';

// helper functions
import { shouldHaveImplementInlineTxtNode, shouldHaveImplementTxtNode } from './helpers/should-helper-markdown';
import { findFirstTypedNode } from './utils/node-utils';

describe('markdown-parser', () => {
  describe('Node type: Document', () => {
    it('empty markdown', () => {
      const doc = parse('');
      expect(doc.type).toBe(Syntax.Document);
      expect(doc.raw).toBe('');
      expect(doc.range).toEqual([0, 0]);
      expect(doc.loc).toEqual({ start: { line: 1, column: 0 }, end: { line: 1, column: 0 } });
    });

    it('multi-line markdown', () => {
      const text = '# Header\n\n- list\n\ntext';
      const doc = parse(text);
      const lines = text.split('\n');
      expect(doc.raw).toBe(text);
      expect(doc.loc).toEqual({
        start: { line: 1, column: 0 },
        end: { line: lines.length, column: lines[lines.length - 1].length },
      });
      expect(doc.range).toEqual([0, text.length]);
    });
  });

  describe('Node type: Paragraph', () => {
    const raw = 'string';
    let ast;
    beforeEach(() => {
      ast = parse(raw);
    });

    it('Paragraph', () => {
      const node = findFirstTypedNode(ast, Syntax.Paragraph, raw);
      shouldHaveImplementTxtNode(node, raw);
    });

    it('Str', () => {
      const node = findFirstTypedNode(ast, Syntax.Str, raw);
      shouldHaveImplementTxtNode(node, raw);
    });
  });
});
