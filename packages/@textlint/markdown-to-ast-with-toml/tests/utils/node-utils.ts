// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { TxtNode } from '@textlint/ast-node-types';
import traverse from 'neotraverse/legacy';

function findFirstTypedNode(node: TxtNode, type: string, value?: string): TxtNode {
  let result: TxtNode | null = null;
  traverse(node).forEach(function(x) {
    if (this.notLeaf && x.type === type) {
      if (value == null || x.raw === value) {
        result = x;
      }
    }
  });
  if (!result) {
    throw new Error(`Not Found type:${type} value:${value ?? '(any)'}`);
  }
  return result;
}

export { findFirstTypedNode };
