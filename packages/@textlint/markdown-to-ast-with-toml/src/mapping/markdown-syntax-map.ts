// LICENSE : MIT
'use strict';
import { ASTNodeTypes } from '@textlint/ast-node-types';

export const SyntaxMap = {
  root: ASTNodeTypes.Document,
  paragraph: ASTNodeTypes.Paragraph,
  blockquote: ASTNodeTypes.BlockQuote,
  listItem: ASTNodeTypes.ListItem,
  list: ASTNodeTypes.List,
  heading: ASTNodeTypes.Header,
  code: ASTNodeTypes.CodeBlock,
  HtmlBlock: ASTNodeTypes.HtmlBlock,
  thematicBreak: ASTNodeTypes.HorizontalRule,
  // inline block
  text: ASTNodeTypes.Str,
  break: ASTNodeTypes.Break,
  emphasis: ASTNodeTypes.Emphasis,
  strong: ASTNodeTypes.Strong,
  html: ASTNodeTypes.Html,
  link: ASTNodeTypes.Link,
  image: ASTNodeTypes.Image,
  inlineCode: ASTNodeTypes.Code,
  delete: ASTNodeTypes.Delete,
  // remark(markdown) extension
  // Following type is not in @textlint/ast-node-types
  yaml: 'Yaml',
  toml: 'Toml',
  table: 'Table',
  tableRow: 'TableRow',
  tableCell: 'TableCell',
  linkReference: 'LinkReference',
  imageReference: 'ImageReference',
  footnoteReference: 'FootnoteReference', // textlint@12+
  definition: 'Definition',
  /**
   * @deprecated
   */
} as const;
