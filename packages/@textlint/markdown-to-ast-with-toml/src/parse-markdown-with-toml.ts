// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// src/parse-markdown-with-toml.ts

// type
import type { Root } from 'mdast';

// Load plugins
import { unified } from 'unified';

import frontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';

const remark = unified()
  .use(remarkParse)
  .use(frontmatter, ['yaml', 'toml'])
  .use(remarkGfm);

const parseMarkdownWithTOML = (text: string): Root => {
  return remark.parse(text);
};

// export
export { parseMarkdownWithTOML };
