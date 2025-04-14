// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// src/filters/tests/ignoreFrontmatterFilterRule.spec.ts

//  UnitTest Module
import { describe, expect, it } from 'vitest';

// test helpers
import { textlintTestRunner } from '../../tests/utils/textlintTestRunner';

// rule & filter
import { ngWordRule } from '../../tests/rules/ngWordRule';
import { ignoreFrontmatterFilterRule } from '../ignoreFrontmatterFilterRule';
//

// ✅ 共通呼び出し runner 化（filter + rule セット済み）
const frontmatterFilterRunner = (text: string) =>
  textlintTestRunner({
    text,
    rule: { ruleId: 'ng-word', rule: ngWordRule },
    filter: { ruleId: 'ignore-frontmatter', rule: ignoreFrontmatterFilterRule },
  });

// Unit Test main
describe('ignoreFrontmatterFilterRule', () => {
  it('should ignore YAML frontmatter that includes NG word', async () => {
    const result = await frontmatterFilterRunner('---\ntitle: NG\n---\nClean content.');
    expect(result.messages).toHaveLength(0);
  });

  it('should ignore TOML frontmatter with NG word', async () => {
    const result = await frontmatterFilterRunner('+++\ntitle = "NG"\n+++\nMore text');
    console.debug('Result (+++):\n', result.messages);
    expect(result.messages).toHaveLength(0);
  });

  it('should report error if NG is outside frontmatter', async () => {
    const result = await frontmatterFilterRunner('---\ntitle: test\n---\nNG is here.');
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].message).toBe('NG word found');
  });

  it('should report error when no frontmatter and NG exists', async () => {
    const result = await frontmatterFilterRunner('This is NG');
    expect(result.messages).toHaveLength(1);
  });

  it('should treat mismatched delimiters as non-frontmatter', async () => {
    const result = await frontmatterFilterRunner('---\ntitle: test\n+++\nNG');
    expect(result.messages).toHaveLength(1);
  });
});
