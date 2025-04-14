// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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

    const ast = parseMarkdownWithTOML(input);

    // 構造検証: 最初の有効ノードが heading、次に paragraph
    const children = (ast as any).children;
    expect(children[0].type).toBe('heading');
    expect(children[0].depth).toBe(1);
    expect(children[1].type).toBe('paragraph');
  });

  it('should parse markdown with TOML frontmatter', () => {
    const input = `+++
title = "Hello"
date = 2024-01-01
+++

# TOML Heading

TOML based paragraph.`;

    const ast = parseMarkdownWithTOML(input);

    const children = (ast as any).children;
    expect(children[0].type).toBe('heading');
    expect(children[0].depth).toBe(1);
    expect(children[1].type).toBe('paragraph');
  });
});
