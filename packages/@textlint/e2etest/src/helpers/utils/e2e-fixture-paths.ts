// src: helpers/utils/e2e-fixture-paths.ts
// @(#) : fixture パターン用に、テストケースのパス取得などを行うユーティリティ
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// --- imports

// types

// libs
import path from 'path';

// --- private properties
/**
 * テストケース検索用基準ディレクトリ
 *
 * @internal
 */
let _baseAbsDir: string | undefined;

// --- functions
/**
 * 現在設定されているディレクトリパスを初期化します。
 *
 * @param dir 設定するディレクトリ
 * @returns 現在設定されているディレクトリパス
 */
export const initializeFixtureBaseDir = (dir: string): string => {
  _baseAbsDir ??= dir;
  return _baseAbsDir || '';
};

/**
 * 現在設定されている Fixture テストのルートディレクトリを取得します。
 * 設定されていない場合はエラーをThrowします。
 *
 * @throws エラー: 初期化されていない場合
 * @returns Fixture テストの基準ディレクトリ
 */
export const getFixtureBaseDir = (): string => {
  if (!_baseAbsDir) {
    throw new Error('Fixture base dir not initialized.');
  }
  return _baseAbsDir;
};

/**
 * テスト対象の Fixture パスを取得します。
 *
 * @param caseDir - テストケースのカテゴリまたはサブディレクトリ名
 * @param caseName - 実際のテストケースファイル名またはディレクトリ名
 * @returns 絶対パスとしてのテスト対象ファイルパス
 */
export const getFixtureTestPath = (caseDir: string, caseName: string): string => {
  return path.join(getFixtureBaseDir(), caseDir, caseName);
};

// --- exports const
/**
 * E2E テストにおける Fixture パス関連のユーティリティ群。
 *
 * - `initializeFixtureBaseDir`: ルートディレクトリの初期化
 * - `getFixtureBaseDir`: ルートディレクトリの取得
 * - `getFixtureTestPath`: 指定ケースのパス取得
 */
export const fixturePaths = {
  getFixtureTestPath,
  getFixtureBaseDir,
};
