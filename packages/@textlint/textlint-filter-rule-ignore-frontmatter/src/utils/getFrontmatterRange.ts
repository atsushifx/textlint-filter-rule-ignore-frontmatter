// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * frontmatterの範囲を [start, end] で返す。
 * 見つからなかった場合は null。
 */
type FrontmatterRange = [start: number, end: number,] | null;

// delimiterが正規表現に対応するようにエスケープする
const escapeRegExp = (str: string,): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&',);
};

// delimiter で括られたfrontmatter部を返す／見つからない場合=null
const getFrontmatterRange = (text: string, delimiter: string,): FrontmatterRange => {
  if (!text) { return null; }
  if (!delimiter) { return null; }

  const escapedDelimiter = escapeRegExp(delimiter,);
  const regex = new RegExp(`^${escapedDelimiter}[\\s\\S]*?${escapedDelimiter}\\s*\\n?`,);
  const match = text.match(regex,);

  if (!match || match.index !== 0) {
    return null;
  }

  return [match.index, match.index + match[0].length,];
};

// export
export { escapeRegExp, FrontmatterRange, getFrontmatterRange, };
