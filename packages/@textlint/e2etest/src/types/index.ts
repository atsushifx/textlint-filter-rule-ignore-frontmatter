// src: types/index.ts
// @(#) : index.ts バレルファイル for types
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// --- exports (type definitions)

/** E2E テスト用*/
export type { E2EErrorMessage, E2ERuleEntry, E2ETestOptions } from './e2e.types';

/** E2E テスト用: テストケースファクトリ型 */
export type { E2ELintTestCase } from './e2e-factories.types';

/** E2E テスト用: プラグイン設定マッピング */
export type { E2EPluginOptionsByExt, E2EPluginSetting } from './e2e-plugin.types';

/** E2E テスト用: Lint系 */
export type { E2ELintFunction, E2ELintResult, E2EParsedFixture } from './e2e-lint.types';

/** E2E テスト用: Expect系 */
export type { E2EExpectFunction } from './e2e-expect.types';
