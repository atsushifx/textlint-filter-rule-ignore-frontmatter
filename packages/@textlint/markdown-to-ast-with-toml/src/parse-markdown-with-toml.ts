// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// src/parse-markdown-with-toml.ts

// type
import type { Node } from 'unist';

// libs

const parseMarkdownWithTOML = (text: string): Node => {
  return {
    type: 'Document',
    position: {
      start: { line: 1, column: 0, offset: 0 },
      end: { line: 1, column: 0, offset: 0 },
    },
    data: {
      raw: text,
    },
  };
};
// export
export { parseMarkdownWithTOML };
