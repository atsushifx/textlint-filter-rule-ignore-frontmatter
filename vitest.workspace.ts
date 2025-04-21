import { defineWorkspace, } from 'vitest/config';

export default defineWorkspace([
  './shared/configs/vitest.config.base.ts',
  './packages/@textlint/textlint-plugin-markdown-with-toml/vitest.config.unit.ts',
  './packages/@textlint/textlint-plugin-markdown-with-toml/vitest.config.ts',
  './packages/@textlint/textlint-filter-rule-ignore-frontmatter/vitest.config.ts',
  './packages/@textlint/markdown-to-ast-with-toml/vitest.config.ts',
  './packages/@textlint/e2etest/vitest.config.ts',
  './packages/@textlint/e2etest/vitest.config.e2e.ts',
],);
