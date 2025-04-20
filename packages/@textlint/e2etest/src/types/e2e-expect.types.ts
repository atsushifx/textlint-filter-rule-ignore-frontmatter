// src: types/e2e-expect.ts
// @(#) : ユニットテスト用 expect関数
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// Vitest/Jest 互換の `expect()` を注入して matcher（toBe など）を使えるようにするための型。
// <<

/**
 * expect() のリターン値で使用される matcher 型
 */
export interface E2EMatcher {
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBe(expected: any): void;
  toContain(expected: any): void;
}

/**
 * expect 関数：actual,message を受け取り matcher を返す
 */
export type E2EExpectFunction = (actual: any, message?: string  ) => E2EMatcher;
