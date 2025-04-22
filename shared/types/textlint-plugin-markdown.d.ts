// src: shared/types/textlint-plugin-markdown.d.ts
// @(#) : textlint plugin markdown types
//
// @version   1.0.0
// @since     2025-04-23
// @author    atsushifx <atsushifx@gmail.com>
// @license   MIT
//
// @description<<
//
// Types for textlint plugin markdown.
//
// <<

// shared/types/textlint-plugin-markdown.d.ts

declare module '@textlint/textlint-plugin-markdown' {
  import type { TextlintPluginCreator } from '@textlint/types';

  const plugin: TextlintPluginCreator;
  export = plugin;
}
