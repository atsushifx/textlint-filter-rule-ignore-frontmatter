// src: types/e2e-factories.types.ts
//  @(#) : factories: ユニットテスト、テストケース作成ファクトリー
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * 単一のE2Eテストケースを表す型
 */
export type E2ELintTestCase = {
  suiteTitle: string;
  testLabel: string;
  run: () => Promise<void>;
};
