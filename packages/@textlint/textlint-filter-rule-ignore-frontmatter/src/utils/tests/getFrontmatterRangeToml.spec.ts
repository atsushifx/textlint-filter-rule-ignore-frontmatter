// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { describe, expect, it, } from 'vitest';
import { FrontmatterRange, getFrontmatterRange, } from '../getFrontmatterRange';

describe('getFrontmatterRange by "+++" (TOML)', () => {
  const matter = '+++\ntitle = "test"\n+++\n';
  const content = 'This is body text.';
  const fullText = `${matter}${content}`;

  it('should return null if text is empty', () => {
    const result: FrontmatterRange = getFrontmatterRange('', '+++',);
    expect(result,).toBeNull();
  });

  it('should return null if delimiter is empty', () => {
    const result: FrontmatterRange = getFrontmatterRange(fullText, '',);
    expect(result,).toBeNull();
  });

  it('should return valid range if TOML frontmatter matches', () => {
    const result: FrontmatterRange = getFrontmatterRange(fullText, '+++',);
    expect(result,).not.toBeNull();
    expect(result?.[0],).toBe(0,);
    expect(result?.[1],).toBe(matter.length,);
  });

  it('should return null if no frontmatter exists', () => {
    const plain = 'No TOML frontmatter here.';
    const result = getFrontmatterRange(plain, '+++',);
    expect(result,).toBeNull();
  });

  it('should return null if closing delimiter is invalid', () => {
    const brokenMatter = '+++\ntitle = "test"\n++\n';
    const result = getFrontmatterRange(`${brokenMatter}${content}`, '+++',);
    expect(result,).toBeNull();
  });

  it('should return null if mixed delimiter is used', () => {
    const mismatchedMatter = '+++\ntitle = "test"\n---\n';
    const result = getFrontmatterRange(`${mismatchedMatter}${content}`, '+++',);
    expect(result,).toBeNull();
  });

  it('should only return the first frontmatter range even if doubled', () => {
    const doubledText = fullText + '\nadd text\n' + fullText;
    const result = getFrontmatterRange(doubledText, '+++',);
    expect(result,).not.toBeNull();
    expect(result?.[0],).toBe(0,);
    expect(result?.[1],).toBe(matter.length,);
  });

  it('should return null if frontmatter is not at the top', () => {
    const commentedText = '<!-- comment -->\n>' + fullText;
    const result = getFrontmatterRange(commentedText, '+++',);
    expect(result,).toBeNull();
  });

  it('should return null if delimiter contains whitespace', () => {
    const whiteSpacedDelimiterText = '  +++\n title = "test"\n+++\n'; // Intentionally contains whitespace
    const result = getFrontmatterRange(whiteSpacedDelimiterText, '+++',);
    expect(result,).toBeNull();
  });
});
