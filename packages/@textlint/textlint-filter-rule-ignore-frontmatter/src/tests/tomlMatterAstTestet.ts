import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml', 'toml']) // 👈 TOML対応のポイント！
  .use(remarkStringify);

const markdown = '+++\ntitle = "test"\n+++\nNG word';

const tree = processor.parse(markdown);

console.dir(tree, { depth: null });
