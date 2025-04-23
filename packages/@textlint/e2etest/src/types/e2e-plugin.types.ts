// src: types/e2e-plugin.types.ts
// @(#) : プラグイン、関数精製用の型定義
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// type
import type { TextlintPluginProcessor } from '@textlint/kernel';

// --- type, interface settings
/**
 * 拡張子ごとのプラグイン構造体
 */
export type E2EPluginSetting = {
  Processor: TextlintPluginProcessor;
  availableExtensions?: () => string[];
  options?: unknown;
};

/**
 * 拡張子をキーにしたマッピング
 */
export type E2EPluginOptionsByExt = Record<string, E2EPluginSetting>;
