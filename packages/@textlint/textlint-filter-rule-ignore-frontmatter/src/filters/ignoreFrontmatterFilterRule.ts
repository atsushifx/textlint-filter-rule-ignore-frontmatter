// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type {
  TextlintFilterRuleContext,
  TextlintFilterRuleModule,
  TextlintFilterRuleReportHandler,
} from '@textlint/types';

// utils
import { getFrontmatterRange } from '../utils/getFrontmatterRange';

// filter main
const ignoreFrontmatterFilterRule: TextlintFilterRuleModule = (
  context: TextlintFilterRuleContext,
): TextlintFilterRuleReportHandler => {
  const text = context.getSource();
  console.debug('[filter] full text:', JSON.stringify(text));

  const delimiters = ['+++', '---'];
  for (const delimiter of delimiters) {
    const range = getFrontmatterRange(text, delimiter);
    if (range) {
      const [start, end] = range;
      const ignored = text.slice(start, end);
      console.debug(`[ignore-frontmatter] Ignoring (${start}-${end}):\n${JSON.stringify(ignored)}`);
      context.shouldIgnore(range, {});
      break;
    }
  }

  return {};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ignoreFrontmatterFilterRule as any).meta = {
  name: 'ignore-frontmatter',
};

// export
export { ignoreFrontmatterFilterRule };
