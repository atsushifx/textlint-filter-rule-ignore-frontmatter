// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { Heading, Paragraph, Root, RootContent, Text as MdastText } from 'mdast';

// UnitTest
import { describe, expect, it } from 'vitest';

// parser
import { parseMarkdownWithTOML } from '../parse-markdown-with-toml';

describe('parseMarkdown with TOML frontmatter support', () => {
  it('should parse markdown with YAML frontmatter', () => {
    const input = `---
title: "Hello"
date: 2024-01-01
---

# Heading

Paragraph content.`;

    const ast: Root = parseMarkdownWithTOML(input);
    const children: RootContent[] = ast.children;

    // Test
    expect(children[0].type).toBe('yaml');
    const heading = children[1] as Heading;
    expect(heading.type).toBe('heading');
    expect(heading.depth).toBe(1);
  });

  it('should parse markdown with TOML frontmatter', () => {
    const input = `+++
title = "Hello"
date = 2024-01-01
+++

# TOML Heading

TOML based paragraph.`;

    const ast: Root = parseMarkdownWithTOML(input);
    const children: RootContent[] = ast.children;

    // Test
    expect(children[0].type).toBe('toml');

    const heading = children[1] as Heading;
    expect(heading.type).toBe('heading');
    expect(heading.depth).toBe(1);
  });

  // invalid cases
  it('should not parse frontmatter with mixed delimiters (--- +++)', () => {
    const input = `---
title = "混在"
+++

# Mixed Heading

混在したデリミタは無視されるはず。`;

    const ast: Root = parseMarkdownWithTOML(input);
    const children: RootContent[] = ast.children;

    // frontmatter ノードとして認識されない
    expect(children[0].type).not.toBe('yaml');
    // 最初のテキストはs水平線('---')となる
    expect(children[0].type).toBe('thematicBreak');
    expect(children[1].type).toBe('paragraph');
    expect(children[2].type).toBe('heading');
  });

  it('should not parse frontmatter if delimiters have leading whitespace', () => {
    const input = `  ---
title: "空白あり"
  ---

# Whitespace Heading

空白のあるデリミタは無効とする。`;

    const ast: Root = parseMarkdownWithTOML(input);
    const children: RootContent[] = ast.children;

    // "  ---" は frontmatter として扱われない
    expect(children[0].type).not.toBe('yaml');
    expect(children[0].type).not.toBe('toml');
    expect(children[0].type).toBe('thematicBreak');
  });

  it('should not parse frontmatter if closing delimiter is missing', () => {
    const input = `+++
title = "閉じてない TOML frontmatter

# Unclosed TOML

閉じない場合は frontmatter として無効扱い。`;

    const ast: Root = parseMarkdownWithTOML(input);
    const children: RootContent[] = ast.children;

    // 終了デリミタが無い → frontmatter ノードとして認識されず、パラグラフになる
    const firstParagraph = children[0] as Paragraph;

    expect(children[0].type).not.toBe('toml');
    expect(firstParagraph.type).toBe('paragraph');
    expect(firstParagraph.children[0].type).toBe('text');
    if (firstParagraph.children[0].type === 'text') {
      const firstText: MdastText = firstParagraph.children[0];
      expect(firstText.value).contains('title =');
    }
  });
});
