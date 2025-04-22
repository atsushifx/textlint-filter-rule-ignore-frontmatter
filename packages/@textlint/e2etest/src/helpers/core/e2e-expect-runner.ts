// src: helpers/core/e2e-expect-runner.ts
// @(#) : expect function 外挿用コンテナ
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//
// @description<<
// E2E テスト用の expect runner。
// テストフレームワークのアサーション関数（expect/jestなど）を注入し、
// ライブラリ内で直接依存せずに検証を行うための DI コンテナ。
// <<

// --- imports

// types
import type { E2EExpectFunction } from '@/types/e2e-expect.types';

// --- private state
let injectedExpect: E2EExpectFunction | undefined;

/**
 * E2Eユーティリティから使用する expect 関数を登録します。
 * Vitest / Jest 側の expect(a).toBe(b) をラップした関数を渡します。
 */
export const setE2EExpect = (expectFn: E2EExpectFunction): void => {
  injectedExpect = expectFn;
};

/**
 * 現在登録されている expect 関数を取得します。
 * 未登録（setE2EExpect 未実行）状態で呼び出すと例外が発生します。
 */
export const getE2EExpect = (): E2EExpectFunction => {
  if (!injectedExpect) {
    throw new Error(
      '[e2e-expect-runner] `expect` function not set. Please call `setE2EExpect()` before running tests.',
    );
  }
  return injectedExpect;
};
