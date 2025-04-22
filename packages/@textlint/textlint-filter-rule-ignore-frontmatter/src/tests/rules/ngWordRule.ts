// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// src/tests/dummy-rule.ts
// src/tests/dummy-rule.ts
import type { TextlintRuleContext, TextlintRuleReporter, } from '@textlint/types';

// dummy rule is check NG linter
const ngWordRule: TextlintRuleReporter = (context: TextlintRuleContext,) => {
  const { Syntax, getSource, report, RuleError, } = context;

  return {
    [Syntax.Str](node,) {
      const text = getSource(node,);
      console.debug('[ng-word] node text:', JSON.stringify(text,),);
      if (text.includes('NG',)) {
        report(node, new RuleError('NG word found',),);
      }
    },
  };
};

export { ngWordRule, };
