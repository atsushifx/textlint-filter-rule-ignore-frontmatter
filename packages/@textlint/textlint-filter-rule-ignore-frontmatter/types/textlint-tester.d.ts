// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare module 'textlint-tester' {
  type TextlintTesterOptions = {
    text: string;
    ext?: string;
    errors?: {
      message?: string;
      line?: number;
      column?: number;
    }[];
  };

  export default class TextLintTester {
    constructor();
    run(
      ruleName: string,
      rule: any,
      testCases: {
        valid: (string | TextlintTesterOptions)[];
        invalid: TextlintTesterOptions[];
      },
    ): void;
  }
}
