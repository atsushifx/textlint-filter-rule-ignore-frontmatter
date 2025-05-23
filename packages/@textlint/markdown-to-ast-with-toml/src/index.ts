// type
import type { TxtDocumentNode, } from '@textlint/ast-node-types';

// modules
import { ASTNodeTypes, } from '@textlint/ast-node-types';
import debug0 from 'debug';
import traverse from 'neotraverse/legacy';
import { SyntaxMap, } from './mapping/markdown-syntax-map';

// parser
import { parseMarkdownWithTOML, } from './parse-markdown-with-toml';
// debug
const debug = debug0('@textlint/markdown-to-ast',);

export { ASTNodeTypes as Syntax, };

/**
 * parse Markdown text and return ast mapped location info.
 * @param {string} text
 */
function parse(text: string,): TxtDocumentNode {
  // remark-parse's AST does not consider BOM
  // AST's position does not +1 by BOM
  // So, just trim BOM and parse it for `raw` property
  // textlint's SourceCode also take same approach - trim BOM and check the position
  // This means that the loading side need to consider BOM position - for example fs.readFile and text slice script.
  // https://github.com/micromark/micromark/blob/0f19c1ac25964872a160d8b536878b125ddfe393/lib/preprocess.mjs#L29-L31
  const hasBOM = text.charCodeAt(0,) === 0xfeff;
  const textWithoutBOM = hasBOM ? text.slice(1,) : text;
  const ast = parseMarkdownWithTOML(textWithoutBOM,);
  traverse(ast,).forEach(function(node,) {
    if (this.notLeaf) {
      if (node.type) {
        const replacedType = SyntaxMap[node.type as keyof typeof SyntaxMap];
        if (!replacedType) {
          debug(`replacedType : ${replacedType} , node.type: ${node.type}`,);
        } else {
          node.type = replacedType;
        }
      }
      // map `range`, `loc` and `raw` to node
      if (node.position) {
        const position = node.position;
        // line start with 1
        // column start with 0
        const positionCompensated = {
          start: { line: position.start.line, column: Math.max(position.start.column - 1, 0,), },
          end: { line: position.end.line, column: Math.max(position.end.column - 1, 0,), },
        };
        const range = [position.start.offset, position.end.offset,] as const;
        node.loc = positionCompensated;
        node.range = range;
        node.raw = textWithoutBOM.slice(range[0], range[1],);
        // Compatible for https://github.com/syntax-tree/unist, but it is hidden
        Object.defineProperty(node, 'position', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: position,
        },);
      }
    }
  },);
  return ast as unknown as TxtDocumentNode;
}

// export
export { parse, };
