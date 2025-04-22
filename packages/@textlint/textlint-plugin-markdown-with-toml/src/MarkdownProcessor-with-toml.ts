// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use strict';
// types
import type {
  TextlintMessage,
  TextlintPluginOptions,
  TextlintPluginPostProcessResult,
  TextlintPluginPreProcessResult,
  TextlintPluginProcessor,
} from '@textlint/types';

// parser
import { parse, } from '@textlint/markdown-to-ast-with-toml';

class MarkdownProcessorWithTOML implements TextlintPluginProcessor {
  // property
  config: TextlintPluginOptions;
  extensions: Array<string>;

  // constuctor
  constructor(config = {},) {
    this.config = config;
    this.extensions = this.config.extensions ? this.config.extensions : [];
  }

  // methods
  availableExtensions(): string[] {
    return ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mkdown', '.ron',].concat(this.extensions,);
  }
  processor(): {
    preProcess: (text: string, filePath?: string,) => TextlintPluginPreProcessResult;
    postProcess: (messages: TextlintMessage[], filePath?: string,) => TextlintPluginPostProcessResult;
  } {
    return {
      preProcess(text: string, filePath?: string,): TextlintPluginPreProcessResult {
        return parse(text,);
      },
      postProcess(messages: TextlintMessage[], filePath?: string,): TextlintPluginPostProcessResult {
        return {
          messages,
          filePath: filePath || `<unknown>`,
        };
      },
    };
  }
}
// export
export { MarkdownProcessorWithTOML, };
